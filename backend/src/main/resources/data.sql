INSERT INTO jira.role (id , name) VALUES (1 , 'Product Owner'), (2 , 'Team Lead') , (3 , 'Team Member'), (4 , 'Architecture Owner'), (5 , 'Stakeholder');

INSERT INTO jira.priority (name, `_order`) VALUES ('Low', 1), ('Medium', 2), ('High', 3);

INSERT INTO jira.user(id, email,password,user_name) VALUES(1, 'admin' , '$2a$10$Xs4.NukKenO7qIYuM58vAel9Y9eRWyU.BFZKcctydiH5IQR7qXyxK' , 'admin');

INSERT INTO jira.project(id, code, description, name, owner_id, leader_id) VALUES (1, 'TEST', 'This project for testing', 'Testing Project', 1, 1);
INSERT INTO jira.user_role(project_id, role_id, user_id) VALUES (1, 1, 1);

INSERT INTO jira.workflow(id, name) VALUES (1, 'Default WorkFlow');
INSERT INTO jira.workflow(id, name, project_id) VALUES (2, 'Testing WorkFlow', 1);

INSERT INTO jira.workflow_item(id, name, `_order`, workflow_id) VALUES (1, 'Not started', 1, 1), (2, 'In progress', 2, 1), (3, 'Done', 3, 1);
INSERT INTO jira.workflow_item(id, name, `_order`, workflow_id, color, location) VALUES (4, 'Alpha', 1, 2, 'lightgreen', '0 0'), (5, 'Beta', 2, 2, 'lightgreen', '0 0'), (6, 'Gamma', 3, 2, 'lightgreen', '0 0'), (7, 'Delta', 4, 2, 'lightgreen', '0 0');

INSERT INTO jira.link_workflow(workflow_from, workflow_to) VALUES (1, 2), (2, 3), (4, 5), (5, 6), (6, 7), (7, 1);

INSERT INTO jira.issue_type(icon_url , `name`, project_id) VALUES(null , 'Task' , NULL);
INSERT INTO jira.issue_type(icon_url , `name`, project_id) VALUES(null , 'Bug' , NULL);

UPDATE jira.project SET workflow_id = 2;
UPDATE jira.workflow SET start_status_id = 1 WHERE id = 1;
UPDATE jira.workflow SET end_status_id = 3 WHERE id = 1;
UPDATE jira.workflow SET start_status_id = 4 WHERE id = 2;
UPDATE jira.workflow SET end_status_id = 7 WHERE id = 2;