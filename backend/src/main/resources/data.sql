INSERT INTO jira.role (id , name) VALUES (1 , 'Product Owner'), (2 , 'Team Lead') , (3 , 'Team Member'), (4 , 'Architecture Owner'), (5 , 'Stakeholder');

INSERT INTO jira.priority (name, `_order`) VALUES ('Low', 1), ('Medium', 2), ('High', 3);

INSERT INTO jira.user(email,password,user_name) VALUES('admin' , '$2a$10$Xs4.NukKenO7qIYuM58vAel9Y9eRWyU.BFZKcctydiH5IQR7qXyxK' , 'admin');

INSERT INTO jira.workflow(id, name) VALUES (1, 'Default WorkFlow');

INSERT INTO jira.workflow_item(id, name, `_order`, workflow_id) VALUES (1, 'Open', 1, 1), (2, 'Inprogress', 2, 1), (3, 'Close', 3, 1);

INSERT INTO jira.link_workflow(workflow_from, workflow_to) VALUES (1, 2), (2, 3);

