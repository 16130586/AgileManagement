INSERT INTO jira.role (id , name) VALUES (1 , 'Product Owner'), (2 , 'Team Lead') , (3 , 'Team Member'), (4 , 'Architecture Owner'), (5 , 'Stakeholder');

INSERT INTO jira.priority (name, `_order`) VALUES ('Low', 1), ('Medium', 2), ('High', 3);

INSERT INTO jira.user(email,password,user_name) VALUES('admin' , '$2a$10$Xs4.NukKenO7qIYuM58vAel9Y9eRWyU.BFZKcctydiH5IQR7qXyxK' , 'admin')