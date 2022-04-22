const { join } = require('path');
const { existsSync, readFileSync } = require('fs');
const requireFromString = require('require-from-string');

const approaches = ['angular', 'vue', 'react'];

class MetadataCheker {
    descriptionFileExists(viewName) {
        const descriptionLocation = join(__dirname, '..', 'descriptions');
        const descriptionFilePath = join(descriptionLocation, `${viewName}.md`);
        if(!existsSync(descriptionFilePath)) {
            console.error(`Description for view ${viewName} does not exists (${descriptionFilePath})`);
            return false;
        }
        return true;
    }

    getViewFilePath(approach, viewName) {
        let viewPath = join(__dirname, '..', '..', approach, 'src');
        switch(approach) {
            case 'angular':
                viewPath = join(viewPath, 'app', 'pages', viewName, `${viewName}.component.html`);
                break;
            case 'vue':
                viewPath = join(viewPath, 'views', `${viewName}.vue`);
                break;
            case 'react':
                viewPath = join(viewPath, 'pages', viewName, `${viewName}.tsx`);
                break;
            default:
                throw new Error(`Unknown approach ${approach}`);
        }
        return viewPath;
    }

    viewFileExists(viewName) {
        let result = true;
        approaches.forEach(approach => {
            const viewFilePath = this.getViewFilePath(approach, viewName);
            if(!existsSync(viewFilePath)) {
                result = false;
                console.error(`View ${viewName} does not exists in ${approach} application (${viewFilePath})`);
            }
        });
        return result;
    }

    navigationModuleContent(approach) {
        const navigationModulePath = join(
            __dirname,
            '..',
            '..',
            approach,
            'src',
            approach === 'angular' ? 'app' : '',
            `app-navigation.ts`
        );

        return readFileSync(navigationModulePath)
            .toString()
            .replace(/export (const navigation =|default)/, 'module.exports =');
    }

    isViewInNavigation(viewName, navigation) {
        return navigation.some(navItem => {
            if(navItem.path) {
                if(navItem.path.slice(1).toLowerCase() === viewName) return true;
            } else if(navItem.items && navItem.items.length > 0) {
                return this.isViewInNavigation(viewName, navItem.items);
            }
        });
    }

    navigationExists(viewName) {
        let result = true;
        approaches.forEach(approach => {
            const navigation = requireFromString(this.navigationModuleContent(approach));
            if(!this.isViewInNavigation(viewName, navigation)) {
                console.error(`View ${viewName} does not exists in ${approach} navigation (app-navigation)`);
                result = false;
            }
        });
        return result;
    }

    checkView(viewName) {
        return this.descriptionFileExists(viewName) &&
            this.viewFileExists(viewName) &&
            this.navigationExists(viewName);
    }

    getViews(demos) {
        return demos.map(demo => demo.Name);
    }

    checkMeta(metadata) {
        const views = [];
        metadata.forEach(meta => {
            if(meta.Demos) {
                Array.prototype.push.apply(views, this.getViews(meta.Demos));
            } else if(meta.Groups) {
                meta.Groups.forEach(group => {
                    Array.prototype.push.apply(views, this.getViews(group.Demos));
                });
            }
        });
        return views.every(view => this.checkView(view));
    }
}

module.exports.MetadataCheker = MetadataCheker;