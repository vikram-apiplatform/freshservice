import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportFileDialogComponent } from './import-file-dialog/import-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './api.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class AppComponent {

  columns: any = [
    {
      "attributeName": "TicketId",
      "required": true,
      "type": "number"
    },
    {
      "attributeName": "Subject",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Description",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Type",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Status",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Priority",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "AgentEmail",
      "required": true,
      "type": "string",
      "validationType": "email"
    },
    {
      "attributeName": "AgentName",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "ContactEmail",
      "required": true,
      "type": "string",
      "validationType": "email"
    },
    {
      "attributeName": "CompanyName",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "ContactName",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "ContactPhone",
      "required": true,
      "type": "number",
      "validationType": "phone"
    },
    {
      "attributeName": "Tags",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "DepartmentName",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "CreatedTime",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "UpdatedTime",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "ClosedTime",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Attachments",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "CC Emails",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Deleted",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Due By",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Email Config ID",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "FR Due By",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "FR Escalated",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "FWD Emails",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Is Escalated",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Category",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Sub Category",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Item Category",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Reply CC Emails",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Source",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Spam",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "To Emails",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Urgency",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Impact",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Resolution Notes",
      "required": false,
      "type": "string"
    },
    {
      "attributeName": "Application_select",
      "required": true,
      "type": "string"
    },
    {
      "attributeName": "Functional Area_select",
      "required": true,
      "type": "string"
    }
  ];
  autoScan = true;
  isScanning = false;
  isAutoScanDone = false;
  domain: any;
  apikey: any;
  password: any;
  file: any = {};
  jsonfile: any = {};
  importJson = false;
  isLinear = true;
  selectedIndex = 0;
  isconnected = false;
  connectionResult = '';
  isLoading1 = false;
  isLoading2 = false;
  isLoading3 = false;
  attributes: any = [];
  expandedRows: string[] = [];
  scanResult: any = {};
  workflowRunId: any = 'd1c1959e-1a62-44d9-b75e-dd6a6fb74dd3';
  workflowRunData: any;
  s3URL: any;

  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit() {

  }

  TransformData() {
    this.isLoading2 = true;
    let payload = {
      "name": "ZendeskToFreshService",
      "source": {
        "source_type": "CSV",
        "sourceProvider": {
          "producer": "zendesk",
          "title": "zendesk",
          "description": "The intelligent heart of customer experience.",
          "image": "https://s3.amazonaws.com/services.apiplatform.io/service-providers/Service%20providers%20-%20resized%20logo's/Resized%20Logo's/zendesk.png",
          "url": "https://www.zendesk.com/",
          "authorization": [
            {
              "authtype": "OAuth 2.0",
              "authattributes": [
                {
                  "key": "base_url",
                  "displayname": "Authorize URL"
                },
                {
                  "key": "token_url",
                  "displayname": "Access Token URL"
                },
                {
                  "key": "refreshtoken_url",
                  "displayname": "Refresh Token URL"
                },
                {
                  "key": "client_id",
                  "displayname": "Client ID"
                },
                {
                  "key": "client_secret",
                  "displayname": "Client Secret"
                },
                {
                  "key": "scope",
                  "displayname": "Scope"
                }
              ]
            },
            {
              "authtype": "Bearer Token",
              "authattributes": [
                {
                  "key": "token",
                  "displayname": "Token"
                }
              ]
            },
            {
              "authtype": "Basic Authentication",
              "authattributes": [
                {
                  "key": "username",
                  "displayname": "Username"
                },
                {
                  "key": "password",
                  "displayname": "Password"
                }
              ]
            }
          ],
          "partner": "services",
          "account": "services",
          "isPromoted": false,
          "id": 562
        },
        "sourceExecutor": {
          "id": 106161,
          "executor_type": "THIRDPARTY",
          "executor_name": "listTickets",
          "executor_version": "v2",
          "executor_display_name": "List Tickets",
          "executor_description": "To get a list of all tickets in your account, use the Incremental Ticket Export, Cursor Based or Incremental Ticket Export, Time Based endpoint.",
          "executor_category": "Ticketing",
          "executor_category_group": "Ticketing",
          "service_provider": "zendesk",
          "executor_scope": null,
          "partner": "b2b",
          "executor_method_type": "GET",
          "apiUrl": this.s3URL,
          "dataroot": null,
          "pathParams": [
            {
              "key": "subdomain",
              "value": "linxllchelp",
              "description": ""
            }
          ],
          "queryParams": [],
          "headers": [],
          "authModel": {
            "authType": "basic_authentication",
            "authAttributes": {
              "username": "kalpanagish@gmail.com",
              "password": "Zendesk100%"
            }
          },
          "requestBody": {
            "value": "",
            "key": "payload",
            "description": "Document in JSON format",
            "annotation": "RequestBody"
          },
          "prerequisites": null,
          "executors": null,
          "functions": null,
          "responseAttributes": [
            {
              "attributeName": "subject",
              "displayName": null,
              "description": null,
              "type": "String",
              "size": 0,
              "precision": 0,
              "autoIncrement": false,
              "defaultValue": null,
              "subType": [],
              "attributeType": "None",
              "required": false,
              "dataStoragePolicy": "None",
              "apiAccessPolicy": "None",
              "displayPolicy": "None",
              "array": false,
              "customType": false,
              "updateOption": null,
              "previousAttributeName": null,
              "compliances": null
            },
            {
              "customType": false,
              "apiAccessPolicy": "None",
              "attributeName": "description",
              "type": "String",
              "array": false,
              "size": null,
              "precision": null,
              "autoIncrement": false,
              "defaultValue": null,
              "attributeType": "None",
              "dataStoragePolicy": "None",
              "description": null,
              "displayName": null,
              "displayPolicy": null,
              "required": false,
              "subType": []
            }
          ],
          "response": null,
          "attributeMappings": null,
          "source": null,
          "block_attributes": null,
          "workflow_credentials": null,
          "disabled": false,
          "published": true,
          "scopeOfAccess": "public",
          "registeredAsIs": true,
          "creationTime": 1689713238736,
          "lastModifiedTime": 1689713238736,
          "executionLib": null,
          "isDocumentationPublished": true,
          "mockResponses": [
            {
              "statusCode": 200,
              "statusText": null,
              "methodType": "GET",
              "message": "ok",
              "description": null,
              "headers": [
                {
                  "name": "Content-Type",
                  "value": "application/json"
                }
              ],
              "responseAttributes": [],
              "sampleData": {
                "tickets": [
                  {
                    "assignee_id": 235323,
                    "collaborator_ids": [
                      35334,
                      234
                    ],
                    "created_at": "2009-07-20T22:55:29Z",
                    "custom_fields": [
                      {
                        "id": 27642,
                        "value": "745"
                      },
                      {
                        "id": 27648,
                        "value": "yes"
                      }
                    ],
                    "custom_status_id": 123,
                    "description": "The fire is very colorful.",
                    "due_at": null,
                    "external_id": "ahg35h3jh",
                    "follower_ids": [
                      35334,
                      234
                    ],
                    "from_messaging_channel": false,
                    "group_id": 98738,
                    "has_incidents": false,
                    "id": 35436,
                    "organization_id": 509974,
                    "priority": "high",
                    "problem_id": 9873764,
                    "raw_subject": "{{dc.printer_on_fire}}",
                    "recipient": "support@company.com",
                    "requester_id": 20978392,
                    "satisfaction_rating": {
                      "comment": "Great support!",
                      "id": 1234,
                      "score": "good"
                    },
                    "sharing_agreement_ids": [
                      84432
                    ],
                    "status": "open",
                    "subject": "Help, my printer is on fire!",
                    "submitter_id": 76872,
                    "tags": [
                      "enterprise",
                      "other_tag"
                    ],
                    "type": "incident",
                    "updated_at": "2011-05-05T10:38:52Z",
                    "url": "https://company.zendesk.com/api/v2/tickets/35436.json",
                    "via": {
                      "channel": "web"
                    }
                  }
                ]
              }
            }
          ],
          "isMockResponseEnabled": false,
          "block_id": null,
          "gatewaySettings": null,
          "apiQueryModel": null,
          "properties": null,
          "vid": null,
          "nid": null,
          "account": "b2b"
        },
        "rootMapping": "tickets",
        "sourceConnector": {},
        "source_response_type": "array<json>",
        "sourceDatabase": "",
        "sourceDatabaseType": "",
        "sourceMethod": "",
        "sourceDatabaseObject": "",
        "tables": [],
        "code": "",
        "query_builder": {
          "fields": []
        },
        "type": "Database",
        "method_type": "",
        "dbDetails": []
      },
      "target": [
        {
          "target_type": "API",
          "targetProvider": {
            "producer": "freshservice",
            "title": "Freshservice",
            "description": "Freshservice is an intelligent, right-sized service management solution for modern businesses of all sizes.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxRrWhXrKwkBN_V4kWhL7RYl8ytNPH2QCqllw9YbBt1nELFsZ4IRp_zuxzuNYxByGWZU&usqp=CAU",
            "url": "https://developers.freshservice.com/",
            "authorization": [
              {
                "authtype": "API Key",
                "authattributes": [
                  {
                    "key": "key",
                    "displayname": "Key"
                  },
                  {
                    "key": "value",
                    "displayname": "Value"
                  }
                ]
              }
            ],
            "partner": "services",
            "account": "services",
            "isPromoted": false,
            "id": 736
          },
          "targetExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "POST",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/agents",
            "dataroot": null,
            "pathParams": [
              {
                "key": "domain",
                "value": this.domain,
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": this.apikey,
                "password": "Freshworks100%"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "targetConnector": {},
          "process_type_into_target": "json",
          "targetFields": [
            {
              "attributeName": null,
              "displayName": null,
              "description": null,
              "type": null,
              "size": 0,
              "precision": 0,
              "autoIncrement": false,
              "defaultValue": null,
              "subType": [],
              "attributeType": "None",
              "required": false,
              "dataStoragePolicy": "None",
              "apiAccessPolicy": "None",
              "displayPolicy": "None",
              "array": false,
              "customType": false,
              "updateOption": null,
              "previousAttributeName": null,
              "compliances": null
            }
          ],
          "sourceValidateExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "GET",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/agents",
            "dataroot": "agents",
            "pathParams": [
              {
                "key": "domain",
                "value": "linxllcapiplatformio",
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": "S6zDcJivVKxhr32vISBU",
                "password": "x"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "sourceValidationKeys": [
            "email"
          ],
          "targetDatabase": "",
          "targetDatabaseType": "",
          "targetTable": "",
          "operation": "INSERT",
          "condition": "",
          "fieldMappings": [
            {
              "sourcefield": "AgentName",
              "targetfield": "first_name"
            },
            {
              "sourcefield": "AgentEmail",
              "targetfield": "email"
            }
          ],
          "attributes": [
            {
              "attributeName": "subject",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "subject"
              }
            },
            {
              "attributeName": "description",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "description"
              }
            },
            {
              "attributeName": "priority",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.priority === 'urgent' ? 4 : 3)"
              }
            },
            {
              "attributeName": "email",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "static",
                "value": "ishwariya.ganesh@apiplatform.io",
                "valueType": "string"
              }
            },
            {
              "attributeName": "status",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.status === 'open' ? 2 : 3)"
              }
            }
          ]
        },
        {
          "target_type": "API",
          "targetProvider": {
            "producer": "freshservice",
            "title": "Freshservice",
            "description": "Freshservice is an intelligent, right-sized service management solution for modern businesses of all sizes.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxRrWhXrKwkBN_V4kWhL7RYl8ytNPH2QCqllw9YbBt1nELFsZ4IRp_zuxzuNYxByGWZU&usqp=CAU",
            "url": "https://developers.freshservice.com/",
            "authorization": [
              {
                "authtype": "API Key",
                "authattributes": [
                  {
                    "key": "key",
                    "displayname": "Key"
                  },
                  {
                    "key": "value",
                    "displayname": "Value"
                  }
                ]
              }
            ],
            "partner": "services",
            "account": "services",
            "isPromoted": false,
            "id": 736
          },
          "targetExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "POST",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/departments",
            "dataroot": null,
            "pathParams": [
              {
                "key": "domain",
                "value": this.domain,
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": this.apikey,
                "password": "Freshworks100%"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "targetConnector": {},
          "process_type_into_target": "json",
          "targetFields": [
            {
              "attributeName": null,
              "displayName": null,
              "description": null,
              "type": null,
              "size": 0,
              "precision": 0,
              "autoIncrement": false,
              "defaultValue": null,
              "subType": [],
              "attributeType": "None",
              "required": false,
              "dataStoragePolicy": "None",
              "apiAccessPolicy": "None",
              "displayPolicy": "None",
              "array": false,
              "customType": false,
              "updateOption": null,
              "previousAttributeName": null,
              "compliances": null
            }
          ],
          "sourceValidateExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "GET",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/departments",
            "dataroot": "departments",
            "pathParams": [
              {
                "key": "domain",
                "value": "linxllcapiplatformio",
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": "S6zDcJivVKxhr32vISBU",
                "password": "x"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "sourceValidationKeys": [
            "name"
          ],
          "targetDatabase": "",
          "targetDatabaseType": "",
          "targetTable": "",
          "operation": "INSERT",
          "condition": "",
          "fieldMappings": [
            {
              "sourcefield": "DepartmentName",
              "targetfield": "name",
              "override": [
                {
                  "sourcevalue": "Support",
                  "targetvalue": "Sevah Support"
                },
                {
                  "sourcevalue": "Engineering",
                  "targetvalue": "Sevah Support"
                }
              ]
            }
          ],
          "attributes": [
            {
              "attributeName": "subject",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "subject"
              }
            },
            {
              "attributeName": "description",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "description"
              }
            },
            {
              "attributeName": "priority",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.priority === 'urgent' ? 4 : 3)"
              }
            },
            {
              "attributeName": "email",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "static",
                "value": "ishwariya.ganesh@apiplatform.io",
                "valueType": "string"
              }
            },
            {
              "attributeName": "status",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.status === 'open' ? 2 : 3)"
              }
            }
          ]
        },
        {
          "target_type": "API",
          "targetProvider": {
            "producer": "freshservice",
            "title": "Freshservice",
            "description": "Freshservice is an intelligent, right-sized service management solution for modern businesses of all sizes.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxRrWhXrKwkBN_V4kWhL7RYl8ytNPH2QCqllw9YbBt1nELFsZ4IRp_zuxzuNYxByGWZU&usqp=CAU",
            "url": "https://developers.freshservice.com/",
            "authorization": [
              {
                "authtype": "API Key",
                "authattributes": [
                  {
                    "key": "key",
                    "displayname": "Key"
                  },
                  {
                    "key": "value",
                    "displayname": "Value"
                  }
                ]
              }
            ],
            "partner": "services",
            "account": "services",
            "isPromoted": false,
            "id": 736
          },
          "targetExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "POST",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/groups",
            "dataroot": null,
            "pathParams": [
              {
                "key": "domain",
                "value": this.domain,
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": this.apikey,
                "password": "Freshworks100%"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "targetConnector": {},
          "process_type_into_target": "json",
          "targetFields": [
            {
              "attributeName": null,
              "displayName": null,
              "description": null,
              "type": null,
              "size": 0,
              "precision": 0,
              "autoIncrement": false,
              "defaultValue": null,
              "subType": [],
              "attributeType": "None",
              "required": false,
              "dataStoragePolicy": "None",
              "apiAccessPolicy": "None",
              "displayPolicy": "None",
              "array": false,
              "customType": false,
              "updateOption": null,
              "previousAttributeName": null,
              "compliances": null
            }
          ],
          "sourceValidateExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "GET",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/groups",
            "dataroot": "groups",
            "pathParams": [
              {
                "key": "domain",
                "value": "linxllcapiplatformio",
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": "S6zDcJivVKxhr32vISBU",
                "password": "x"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "sourceValidationKeys": [
            "name"
          ],
          "targetDatabase": "",
          "targetDatabaseType": "",
          "targetTable": "",
          "operation": "INSERT",
          "condition": "",
          "fieldMappings": [
            {
              "sourcefield": "DepartmentName",
              "targetfield": "name",
              "override": [
                {
                  "sourcevalue": "Support",
                  "targetvalue": "Sevah Support"
                },
                {
                  "sourcevalue": "Engineering",
                  "targetvalue": "Sevah Support"
                }
              ]
            }
          ],
          "attributes": [
            {
              "attributeName": "subject",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "subject"
              }
            },
            {
              "attributeName": "description",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "description"
              }
            },
            {
              "attributeName": "priority",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.priority === 'urgent' ? 4 : 3)"
              }
            },
            {
              "attributeName": "email",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "static",
                "value": "ishwariya.ganesh@apiplatform.io",
                "valueType": "string"
              }
            },
            {
              "attributeName": "status",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.status === 'open' ? 2 : 3)"
              }
            }
          ]
        },
        {
          "target_type": "API",
          "targetProvider": {
            "producer": "freshservice",
            "title": "Freshservice",
            "description": "Freshservice is an intelligent, right-sized service management solution for modern businesses of all sizes.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxRrWhXrKwkBN_V4kWhL7RYl8ytNPH2QCqllw9YbBt1nELFsZ4IRp_zuxzuNYxByGWZU&usqp=CAU",
            "url": "https://developers.freshservice.com/",
            "authorization": [
              {
                "authtype": "API Key",
                "authattributes": [
                  {
                    "key": "key",
                    "displayname": "Key"
                  },
                  {
                    "key": "value",
                    "displayname": "Value"
                  }
                ]
              }
            ],
            "partner": "services",
            "account": "services",
            "isPromoted": false,
            "id": 736
          },
          "targetExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "POST",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/requesters",
            "dataroot": null,
            "pathParams": [
              {
                "key": "domain",
                "value": this.domain,
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": this.apikey,
                "password": "Freshworks100%"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "targetConnector": {},
          "process_type_into_target": "json",
          "targetFields": [
            {
              "attributeName": null,
              "displayName": null,
              "description": null,
              "type": null,
              "size": 0,
              "precision": 0,
              "autoIncrement": false,
              "defaultValue": null,
              "subType": [],
              "attributeType": "None",
              "required": false,
              "dataStoragePolicy": "None",
              "apiAccessPolicy": "None",
              "displayPolicy": "None",
              "array": false,
              "customType": false,
              "updateOption": null,
              "previousAttributeName": null,
              "compliances": null
            }
          ],
          "sourceValidateExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "GET",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/requesters",
            "dataroot": "requesters",
            "pathParams": [
              {
                "key": "domain",
                "value": "linxllcapiplatformio",
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": "S6zDcJivVKxhr32vISBU",
                "password": "x"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "sourceValidationKeys": [
            "primary_email"
          ],
          "targetDatabase": "",
          "targetDatabaseType": "",
          "targetTable": "",
          "operation": "INSERT",
          "condition": "",
          "fieldMappings": [
            {
              "sourcefield": "ContactName",
              "targetfield": "first_name"
            },
            {
              "sourcefield": "ContactEmail",
              "targetfield": "primary_email"
            }
          ],
          "attributes": [
            {
              "attributeName": "subject",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "subject"
              }
            },
            {
              "attributeName": "description",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "description"
              }
            },
            {
              "attributeName": "priority",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.priority === 'urgent' ? 4 : 3)"
              }
            },
            {
              "attributeName": "email",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "static",
                "value": "ishwariya.ganesh@apiplatform.io",
                "valueType": "string"
              }
            },
            {
              "attributeName": "status",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.status === 'open' ? 2 : 3)"
              }
            }
          ]
        },
        {
          "target_type": "API",
          "targetProvider": {
            "producer": "freshservice",
            "title": "Freshservice",
            "description": "Freshservice is an intelligent, right-sized service management solution for modern businesses of all sizes.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxRrWhXrKwkBN_V4kWhL7RYl8ytNPH2QCqllw9YbBt1nELFsZ4IRp_zuxzuNYxByGWZU&usqp=CAU",
            "url": "https://developers.freshservice.com/",
            "authorization": [
              {
                "authtype": "API Key",
                "authattributes": [
                  {
                    "key": "key",
                    "displayname": "Key"
                  },
                  {
                    "key": "value",
                    "displayname": "Value"
                  }
                ]
              }
            ],
            "partner": "services",
            "account": "services",
            "isPromoted": false,
            "id": 736
          },
          "targetExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "POST",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/tickets",
            "dataroot": null,
            "pathParams": [
              {
                "key": "domain",
                "value": this.domain,
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": this.apikey,
                "password": "Freshworks100%"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "targetConnector": {},
          "process_type_into_target": "json",
          "targetFields": [
            {
              "attributeName": null,
              "displayName": null,
              "description": null,
              "type": null,
              "size": 0,
              "precision": 0,
              "autoIncrement": false,
              "defaultValue": null,
              "subType": [],
              "attributeType": "None",
              "required": false,
              "dataStoragePolicy": "None",
              "apiAccessPolicy": "None",
              "displayPolicy": "None",
              "array": false,
              "customType": false,
              "updateOption": null,
              "previousAttributeName": null,
              "compliances": null
            }
          ],
          "sourceValidateExecutor": {
            "id": 125767,
            "executor_type": "THIRDPARTY",
            "executor_name": "createaTicket",
            "executor_version": "v2",
            "executor_display_name": "Create a Ticket",
            "executor_description": "This API helps you to create a new ticket in your service desk.",
            "executor_category": "Ticket",
            "executor_category_group": "Ticket",
            "service_provider": "freshservice",
            "executor_scope": null,
            "partner": "b2b",
            "executor_method_type": "GET",
            "apiUrl": "https://{domain}.freshservice.com/api/v2/tickets",
            "dataroot": "tickets",
            "pathParams": [
              {
                "key": "domain",
                "value": "apiplatformhelpdesk",
                "description": ""
              }
            ],
            "queryParams": [],
            "headers": [
              {
                "key": "Content-Type",
                "value": "application/json",
                "description": "",
                "req": false
              }
            ],
            "authModel": {
              "authType": "basic_authentication",
              "authAttributes": {
                "username": "wr7jPu0cGqepFtOnjLH",
                "password": "x"
              }
            },
            "requestBody": {
              "value": {
                "description": "Details about the issue...",
                "subject": "Support Needed...",
                "email": "tom@outerspace.com",
                "priority": 1,
                "status": 2,
                "cc_emails": [
                  "ram@freshservice.com",
                  "diana@freshservice.com"
                ],
                "workspace_id": 3
              },
              "key": "payload",
              "description": "Document in JSON format",
              "annotation": "RequestBody"
            },
            "prerequisites": null,
            "executors": null,
            "functions": null,
            "responseAttributes": [
              {
                "attributeName": null,
                "displayName": null,
                "description": null,
                "type": null,
                "size": 0,
                "precision": 0,
                "autoIncrement": false,
                "defaultValue": null,
                "subType": [],
                "attributeType": "None",
                "required": false,
                "dataStoragePolicy": "None",
                "apiAccessPolicy": "None",
                "displayPolicy": "None",
                "array": false,
                "customType": false,
                "updateOption": null,
                "previousAttributeName": null,
                "compliances": null
              }
            ],
            "response": null,
            "attributeMappings": null,
            "source": null,
            "block_attributes": null,
            "workflow_credentials": null,
            "disabled": false,
            "published": true,
            "scopeOfAccess": null,
            "registeredAsIs": true,
            "creationTime": 1710738640166,
            "lastModifiedTime": 1710909701147,
            "executionLib": null,
            "isDocumentationPublished": true,
            "mockResponses": [
              {
                "statusCode": 200,
                "statusText": null,
                "methodType": "POST",
                "message": null,
                "description": null,
                "headers": [
                  {
                    "name": "Content-Type",
                    "value": "application/json"
                  }
                ],
                "responseAttributes": [],
                "sampleData": {
                  "ticket": {
                    "cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fwd_emails": [],
                    "reply_cc_emails": [
                      "ram@freshservice.com",
                      "diana@freshservice.com"
                    ],
                    "fr_escalated": false,
                    "spam": false,
                    "email_config_id": null,
                    "group_id": null,
                    "priority": 1,
                    "requester_id": 1000000675,
                    "requested_for_id": 1000000670,
                    "responder_id": null,
                    "source": 2,
                    "status": 2,
                    "subject": "Support Needed...",
                    "to_emails": null,
                    "department_id": null,
                    "id": 264,
                    "type": "Incident",
                    "due_by": "2017-09-11T10:26:17Z",
                    "fr_due_by": "2017-09-09T10:26:17Z",
                    "is_escalated": false,
                    "description": "<div>Details about the issue...</div>",
                    "description_text": "Details about the issue...",
                    "category": null,
                    "sub_category": null,
                    "item_category": null,
                    "custom_fields": {
                      "auto_checkbox": null
                    },
                    "created_at": "2017-09-08T10:26:17Z",
                    "updated_at": "2017-09-08T10:26:17Z",
                    "tags": [],
                    "attachments": [],
                    "workspace_id": 3,
                    "resolution_notes": "Resolution note for the ticket...",
                    "resolution_notes_html": "<div>Resolution note for the ticket...</div>"
                  }
                }
              }
            ],
            "isMockResponseEnabled": false,
            "block_id": null,
            "gatewaySettings": null,
            "apiQueryModel": null,
            "properties": {
              "showBodyParamDescription": false,
              "bodyParamDescription": []
            },
            "vid": null,
            "nid": null,
            "account": "b2b"
          },
          "sourceValidationKeys": [
            "subject"
          ],
          "targetDatabase": "",
          "targetDatabaseType": "",
          "targetTable": "",
          "operation": "INSERT",
          "condition": "",
          "fieldMappings": [
            {
              "sourcefield": "Subject",
              "targetfield": "subject"
            },
            {
              "sourcefield": "Description",
              "targetfield": "description"
            },
            {
              "sourcefield": "Type",
              "targetfield": "type",
              "override": [
                {
                  "sourcevalue": "Question",
                  "targetvalue": "Incident"
                },
                {
                  "sourcevalue": "Incident",
                  "targetvalue": "Incident"
                },
                {
                  "sourcevalue": "Problem",
                  "targetvalue": "Incident"
                }
              ]
            },
            {
              "sourcefield": "Status",
              "targetfield": "status",
              "override": [
                {
                  "sourcevalue": "Open",
                  "targetvalue": 2
                },
                {
                  "sourcevalue": "Pending",
                  "targetvalue": 3
                },
                {
                  "sourcevalue": "Resolved",
                  "targetvalue": 4
                },
                {
                  "sourcevalue": "Closed",
                  "targetvalue": 5
                }
              ]
            },
            {
              "sourcefield": "Priority",
              "targetfield": "priority",
              "override": [
                {
                  "sourcevalue": "Low",
                  "targetvalue": 1
                },
                {
                  "sourcevalue": "Medium",
                  "targetvalue": 2
                },
                {
                  "sourcevalue": "High",
                  "targetvalue": 3
                },
                {
                  "sourcevalue": "Urgent",
                  "targetvalue": 4
                }
              ]
            },
            {
              "sourcefield": "ContactEmail",
              "targetfield": "email"
            },
            {
              "sourcefield": "CreatedTime",
              "targetfield": "created_at"
            },
            {
              "sourcefield": "UpdatedTime",
              "targetfield": "updated_at"
            },
            {
              "sourcefield": "Application_select",
              "targetfield": "category",
              "override": [
                {
                  "sourcevalue": "IWMS (Manhattan)",
                  "targetvalue": "Hardware"
                },
                {
                  "sourcevalue": "CenterStone / Space",
                  "targetvalue": "Hardware"
                },
                {
                  "sourcevalue": "Atrium EAM",
                  "targetvalue": "Hardware"
                }
              ]
            },
            {
              "sourcefield": "Functional Area_select",
              "targetfield": "sub_category",
              "override": [
                {
                  "sourcevalue": "Lease Administration",
                  "targetvalue": "Computer"
                },
                {
                  "sourcevalue": "Reporting",
                  "targetvalue": "Computer"
                },
                {
                  "sourcevalue": "Orders",
                  "targetvalue": "Computer"
                },
                {
                  "sourcevalue": "Project Management",
                  "targetvalue": "Computer"
                },
                {
                  "sourcevalue": "Other",
                  "targetvalue": "Computer"
                }
              ]
            }
          ],
          "attributes": [
            {
              "attributeName": "subject",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "subject"
              }
            },
            {
              "attributeName": "description",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "",
                "value": "description"
              }
            },
            {
              "attributeName": "priority",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.priority === 'urgent' ? 4 : 3)"
              }
            },
            {
              "attributeName": "email",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "static",
                "value": "ishwariya.ganesh@apiplatform.io",
                "valueType": "string"
              }
            },
            {
              "attributeName": "status",
              "isCalculatedField": false,
              "claculatedField": {
                "fields": [],
                "formula": ""
              },
              "attributeValue": {
                "type": "dynamic",
                "method": "js",
                "value": "target = (source.status === 'open' ? 2 : 3)"
              }
            }
          ]
        }
      ]
    }
    this.apiService.transformData(payload).subscribe(res => {
      console.log(res);
      if (res) {
        let item: any = res;
        this.isLoading2 = false;
        this.workflowRunId = item.workflowRunId;
        this.isLoading3 = true;
        this.apiService.getTranformDataWorkflowDetails(this.workflowRunId).subscribe(res1 => {
          this.isLoading3 = false;
          if (res1) {
            this.workflowRunData = res1;
            console.log(this.workflowRunData);
            this.selectedIndex = 4;
          }
        }, err => {
          this.isLoading3 = false;
        })
      }

    }, err => {
      this.isLoading2 = false;
    })

  }


  connect() {
    if (this.domain && this.apikey) {
      this.isLoading1 = true;
      this.apiService.connectToFreshservice(this.domain, this.apikey).subscribe(res => {
        this.isconnected = true;
        this.isLoading1 = false;
        this.connectionResult = 'success';
        this.apiService.openSnackBar('Successfully connected to Freshservice.', 'x');
      }, err => {
        this.isconnected = true;
        this.isLoading1 = false;
        this.connectionResult = 'failed';
        this.apiService.openSnackBar('Error while connecting to Freshservice.' + err['message'], 'x');
      })

    } else {
      this.apiService.openSnackBar('Please provide the required details', 'x');
    }
  }

  validateS3File() {
    if (this.file && this.file.item) {
      this.isScanning = true;
      this.apiService.uploadToS3(this.file.item).subscribe(res => {
        console.log(res);
        let temp: any = res;
        if (res) {
          const originalUrl = temp['s3URL']
          const newDomain = "https://s3.amazonaws.com/hari.apiplatform.io";
          const domainRegex = /^https?:\/\/[^\/]+/;
          const convertedUrl = originalUrl.replace(domainRegex, newDomain);
          this.s3URL = convertedUrl;
          let payload = {
            "columns": this.columns,
            "file": convertedUrl
          };
          this.apiService.validateS3CSV(payload).subscribe(res1 => {
            this.isScanning = false;
            this.isAutoScanDone = true;
            this.scanResult = res1;
            this.apiService.openSnackBar('Scanning successful', 'Success');
            console.log(res1);
          }, err => {
            this.isScanning = false;
            this.isAutoScanDone = true;
            this.scanResult = {
              "isError": true,
              "durationInSeconds": 0.010470167,
              "errors": [
                {
                  "column": "ContactPhone",
                  "row": 1,
                  "type": "invalid-phone"
                },
                {
                  "column": "Subject",
                  "row": 4,
                  "type": "data-missing"
                },
                {
                  "column": "Description",
                  "row": 4,
                  "type": "data-missing"
                },
                {
                  "column": "Subject",
                  "row": 5,
                  "type": "data-missing"
                }
              ]
            };
            console.log(err);
            this.apiService.openSnackBar('Error while uploading CSV', 'Error');
          });
        }
      }, err => {

        this.apiService.uploadCSV(this.file.item, this.columns).subscribe(res => {
          console.log(res);
          this.isScanning = false;
          this.isAutoScanDone = true;
          this.scanResult = res;
          this.apiService.openSnackBar('Upload successful', 'Success');
        }, err => {
          this.isScanning = false;
          this.isAutoScanDone = true;
          this.scanResult = {
            "isError": true,
            "durationInSeconds": 0.010470167,
            "errors": [
              {
                "column": "ContactPhone",
                "row": 1,
                "type": "invalid-phone"
              },
              {
                "column": "Subject",
                "row": 4,
                "type": "data-missing"
              },
              {
                "column": "Description",
                "row": 4,
                "type": "data-missing"
              },
              {
                "column": "Subject",
                "row": 5,
                "type": "data-missing"
              }
            ]
          };
          console.log(err);
          this.apiService.openSnackBar('Error while uploading CSV', 'Error');
        })
      })
    }

  }

  scanFile() {
    this.validateS3File();
  }

  uploadFile() {
    const dialogRef = this.dialog.open(ImportFileDialogComponent, {
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(async file => {
      if (file) {
        this.file = file;
        this.apiService.uploadCSV(file, this.columns).subscribe(res => {
          console.log(res);
          this.apiService.openSnackBar('Upload successful', 'Success');
        }, err => {
          this.apiService.openSnackBar(err, 'Error');
        })
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          try {
            console.log(reader);

          } catch (e) {
            this.apiService.openSnackBar('Please upload a valid file.', 'Error');
          }
        });
        reader.readAsText(file);
      }
    });
  }


  getFormattedTime(timestamp: any) {
    let date = new Date(timestamp);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let formatted_date = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formatted_date;
  }

  removeOverride(item: any, index: number): void {
    if (item.override) {
      item.override.splice(index, 1);
    }
  }

  addOverride(item: any): void {
    if (!item.override) {
      item.override = [];
    }
    item.override.push({ "sourcevalue": "", "targetvalue": "" });
  }

  toggleCollapse(sourcefield: string): void {
    const index = this.expandedRows.indexOf(sourcefield);
    if (index > -1) {
      this.expandedRows.splice(index, 1);
    } else {
      this.expandedRows.push(sourcefield);
    }
    console.log(this.expandedRows);
  }

  addAttributeField() {
    let obj = {
      sourcefield: '',
      targetfield: '',
      override: [],
    };
    this.attributes.push(obj);
  }

  removeAttribute(data: any, index: any) {
    data.splice(index, 1);
  }

  assignJson(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        let temp: any = JSON.parse(event.target.result);
        this.attributes = temp['fieldMappings'];
        console.log(this.attributes);
      };
      reader.readAsText(file);
    }
  }



  onFileDropped(file: any) {
    this.file['item'] = file[0];
    this.file['progress'] = 0;
  }


  fileBrowseHandler(inputElement: HTMLInputElement) {
    const files = inputElement.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.file = {
        item: selectedFile,
        progress: 0
      };
    }
    if (this.autoScan) {
      this.scanFile();
    }

  }



  fileInputChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.fileBrowseHandler(inputElement);
  }

  deleteFile() {
    if (confirm('Are you sure you want to delete this file?')) {
      this.file = {};
      this.scanResult = undefined;
    }
  }

  onJsonFileDropped(file: any) {
    this.jsonfile['item'] = file[0];
    this.jsonfile['progress'] = 0;
  }


  jsonfileBrowseHandler(inputElement: HTMLInputElement) {
    const files = inputElement.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.jsonfile = {
        item: selectedFile,
        progress: 0
      };
      this.assignJson(selectedFile)
    }

  }



  jsonfileInputChange(event: any) {
    console.log(event)
    const inputElement = event.target as HTMLInputElement;
    this.jsonfileBrowseHandler(inputElement);
  }

  deletejsonFile() {
    if (confirm('Are you sure you want to delete this file?')) {
      this.jsonfile = {};
      this.attributes = [];
    }
  }
}
