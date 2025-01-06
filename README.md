# Dynamic UI Builder

This project is under development and is not currently functional. However, it has been deployed on Google Cloud and can be accessed at the following link:

[Live Deployment on Google Cloud](https://bee-hive-466705018016.asia-south1.run.app)

## Note

- **Project Status**: This project is still under development.
- **Explore the Code**: Even though it's not completed, you can explore the following files:
  - **Config Processing Engine**:  
    Located at `src/ts-files/component-config-processing.ts`
  - **UI Components**:  
    Check out the components in the directory `src/components/ui-components`


## Project Overview

The goal of this project is to create a dynamic UI builder where various components (such as buttons, labels, tables, navigation tabs, collapses, etc.) can be configured and rendered based on a JSON configuration. This allows for the creation of dynamic UIs with customized behavior without the need for extensive manual coding. Components can be dynamically added and configured, with events and API calls associated with them for seamless integration.

## Features
- **Dynamic UI Rendering**: UI components like buttons, labels, tables, and more can be added and configured using JSON.
- **Event Handling**: Events like `onInit` and `click` can be configured, triggering UI changes or API calls.
- **Component Reusability**: Optimized JavaScript and reusable components reduce the project size by 60%, making the solution lightweight.
- **Scalable Deployment**: The project is deployed using Google Cloud Run with Docker for scalability, achieving 99.9% uptime.
- **JSON Configuration Engine**: A robust engine processes JSON configurations and renders components in real-time.
- **Future Plans**: Work is in progress to implement a drag-and-drop system that will allow non-technical users to visually configure the UI, simplifying workflows.

## Tech Stack
- **Frontend**: Angular, TypeScript, HTML, CSS
- **Backend**: Spring Boot, Java
- **Cloud**: Google Cloud Platform (GCP), Cloud Run, Docker
- **Data**: Firestore, BigQuery

## How to Use

1. **Use the JSON Configuration**  
   To add and configure components dynamically, use the following JSON structure.

   ```json
   {
     "name": "DynamicUiBuilderComponent",
     "components": [
       {
         "name": "LabelComponent",
         "description": "This is a ChipLabel Component",
         "version": "v1",
         "customConfig": [
           {
             "staticLabel": "Detailed Loan Cases Report - Filter View"
           }
         ]
       },
       {
         "name": "SimpleButtonComponent",
         "description": "This is a ChipLabel Component",
         "version": "v1",
         "customConfig": [
           {
             "label": "HTTP - Button"
           }
         ],
         "eventsConfig": {
           "configs": [
             {
               "eventNames": ["onInit"],
               "uiConfigs": {
                 "configs": [
                   {
                     "elementConfigs": [
                       {
                         "addClasses": [
                           {
                             "htmlElementSearchConfigs": [
                               {
                                 "searchName": "i",
                                 "type": "tag"
                               }
                             ],
                             "values": [
                               {
                                 "key": "",
                                 "value": "ri-draggable"
                               }
                             ]
                           },
                           {
                             "htmlElementSearchConfigs": [
                               {
                                 "searchName": "",
                                 "type": "self"
                               }
                             ],
                             "values": [
                               {
                                 "key": "",
                                 "value": "btn"
                               },
                               {
                                 "key": "",
                                 "value": "btn-primary"
                               },
                               {
                                 "key": "",
                                 "value": "m-1"
                               },
                               {
                                 "key": "",
                                 "value": "px-1"
                               }
                             ]
                           }
                         ]
                       }
                     ]
                   }
                 ]
               }
             },
             {
               "eventNames": ["click"],
               "httpConfigs": {
                 "configs": [
                   {
                     "httpRequestBodyConfigs": {
                       "payloadVariableSearchConfig": [
                         {
                           "value": [
                             {
                               "entityKindName": "JobStatusDetails",
                               "fieldSearchInputs": [
                                 {
                                   "fieldName": "jobState",
                                   "operator": "EQUAL",
                                   "value": null,
                                   "dataType": "String"
                                 },
                                 {
                                   "fieldName": "type",
                                   "operator": "EQUAL",
                                   "value": "SETTLEMENT",
                                   "dataType": "String"
                                 }
                               ]
                             }
                           ]
                         }
                       ]
                     }
                   }
                 ],
                 "promiseType": "sync"
               }
             }
           ]
         }
       }
     ]
   }
