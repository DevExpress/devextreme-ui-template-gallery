/* eslint-disable no-console */
const { join } = require('path');
const { existsSync, readFileSync } = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const requireFromString = require('require-from-string');

class MetadataChecker {
  descriptionFileExists(viewName) {
    const descriptionLocation = join(__dirname, '..', 'descriptions');
    const descriptionFilePath = join(descriptionLocation, `${viewName}.md`);
    if (!existsSync(descriptionFilePath)) {
      console.error(`Description for view ${viewName} does not exists (${descriptionFilePath})`);
      return false;
    }
    return true;
  }

  getViewFilePath(approach, viewName) {
    let viewPath = join(__dirname, '..', '..', approach, 'src');
    switch (approach) {
      case 'angular':
        viewPath = join(viewPath, 'app', 'pages', viewName, `${viewName}.component.html`);
        break;
      case 'vue':
        viewPath = join(viewPath, 'pages', `${viewName}.vue`);
        break;
      case 'react':
        viewPath = join(viewPath, 'pages', viewName, `${viewName}.tsx`);
        break;
      default:
        throw new Error(`Unknown approach ${approach}`);
    }
    return viewPath;
  }

  viewFileExists(demo) {
    let result = true;
    demo.AvailableApproaches.forEach((approach) => {
      const viewFilePath = this.getViewFilePath(approach, demo.Name);
      if (!existsSync(viewFilePath)) {
        result = false;
        console.error(`View ${demo.Name} does not exists in ${approach} application (${viewFilePath})`);
      }
    });
    return result;
  }

  navigationModuleContent(approach) {
    const ext = approach === 'angular' ? 'ts' : 'tsx';
    const navigationModulePath = join(
      __dirname,
      '..',
      '..',
      approach,
      'src',
      approach === 'angular' ? 'app' : '',
      `app-navigation.${ext}`,
    );

    return readFileSync(navigationModulePath)
      .toString()
      .replace(/export (const navigation =|default)/, 'module.exports =');
  }

  isViewInNavigation(viewName, navigation) {
    return navigation.some((navItem) => {
      if (navItem.path) {
        if (navItem.path.slice(1).toLowerCase() === viewName) return true;
      } else if (navItem.items && navItem.items.length > 0) {
        return this.isViewInNavigation(viewName, navItem.items);
      }

      return false;
    });
  }

  navigationExists(demo) {
    let result = true;
    demo.AvailableApproaches.forEach((approach) => {
      const navigation = requireFromString(this.navigationModuleContent(approach));
      if (!this.isViewInNavigation(demo.Name, navigation)) {
        console.error(`View ${demo.Name} does not exists in ${approach} navigation (app-navigation)`);
        result = false;
      }
    });
    return result;
  }

  checkView(demo) {
    return this.descriptionFileExists(demo.Name)
            && this.viewFileExists(demo)
            && this.navigationExists(demo);
  }

  getViews(demos) {
    return demos.map((demo) => {
      demo.AvailableApproaches = demo.AvailableApproaches
        .map((approach) => approach.toLowerCase());
      return demo;
    });
  }

  checkMeta(metadata) {
    const demos = [];
    metadata.forEach((meta) => {
      if (meta.Demos) {
        Array.prototype.push.apply(demos, this.getViews(meta.Demos));
      } else if (meta.Groups) {
        meta.Groups.forEach((group) => {
          Array.prototype.push.apply(demos, this.getViews(group.Demos));
        });
      }
    });
    return demos.every((demo) => this.checkView(demo));
  }
}

module.exports.MetadataChecker = MetadataChecker;
