# Devextreme UI Template Gallery

Devextreme UI Template Gallery is a repository with a real-word application demo. This demo illustrates how to integrate various DevExtreme UI components into a web application. The projects in this repository includes the CRM and Project Management UI/UX patterns with source code for Angular.

[note]Vue and React projects are under development.

![Devextreme UI Template Gallery](/images/ui-template-gallery.png)

## Get Started

To run these projects on your machine, clone this repository and follow the instructions below.

1. Run the npm command below to install packages to an Angular project and prepare the repository: 

    ```
    npm i
    ```

2. Run the following npm command to enbale the [embedded mode](https://devexpress.github.io/devextreme-ui-templates-gallery/material.blue.light/angular/embedded/) for the project. Skip this step to use the [default mode](https://devexpress.github.io/devextreme-ui-templates-gallery/material.blue.light/angular/default/) for the project.

    ```
    npm run make-embedded-mode
    ```

2. Move to the Angular folder and run the command to start the project:

    ```
    cd packages
    cd angular

    npm run start
    ```

3. Navigate to [http://localhost:4200/](http://localhost:4200/). 
    The project in default mode includes a navigation menu at the left. To navigate between patterns in embedded mode, use the following links:

    /crm-contact-form - CRM Contact Form

    /crm-contact-list - CRM Contact List

    /planning-task-list - Planning task list

    /planning-task-details - Planning task details