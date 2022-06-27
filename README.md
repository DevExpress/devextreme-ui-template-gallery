# Devextreme UI Template Gallery

This repository includes responsive UI Templates for the most pupular UI/UX patterns in web LOB applications. Currently, this project is in the 'preview' stage and contains the following CRM and Project Management UI templates:

* [CRM. Contact List](https://devexpress.github.io/devextreme-ui-template-gallery/material.blue.light.compact/angular/default/#/crm-contact-list)
* [CRM. Contact Form](https://devexpress.github.io/devextreme-ui-template-gallery/material.blue.light.compact/angular/default/#/crm-contact-form)
* [Planning. Task List](https://devexpress.github.io/devextreme-ui-template-gallery/material.blue.light.compact/angular/default/#/planning-task-list)
* [Planning. Task Details](https://devexpress.github.io/devextreme-ui-template-gallery/material.blue.light.compact/angular/default/#/planning-task-details)

The UI Templates have responsive layouts with DevExtreme UI components. Note that the components use sample data entities without any business logic. You can use these UI Templates in your project and adapt them to your specific business requirements.

> The repository is in preview mode. Only Angular version is available for use. Vue and React projects are still under development.

![Devextreme UI Template Gallery](/images/ui-template-gallery.png)

## How It Organized

UI Template sources for Angular are in the [packages/angular](packages/angular) folder. Navigate to the following folders to get the code for each template:

**CRM**

* [Contact List](packages/angular/src/app/pages/crm-contact-list/) 
* [Contact Form](packages/angular/src/app/pages/crm-contact-form/)

**Planning**

* [Task List](packages/angular/src/app/pages/planning-task-list/) 
* [Task Details](packages/angular/src/app/pages/planning-task-details/)

## Get Started

### Angular

To run these UI templates on your machine, clone this repository and follow the instructions below.

1. Run the npm command below to install packages to an Angular project and prepare the repository:  

    ```
    npm i
    ```

2. Move to the Angular folder and run the following command to start the project:

    ```
    cd packages/angular

    npm run start
    ```

3. Navigate to [http://localhost:4200/](http://localhost:4200/). 
    
### React and Vue

DevExtreme UI Templates for React and Vue will be available soon. 
