INSERT INTO jira.`user` VALUES (1,NULL,'admin@xyz.com','Administrator','$2a$10$Xs4.NukKenO7qIYuM58vAel9Y9eRWyU.BFZKcctydiH5IQR7qXyxK','admin'),(2,NULL,'user@abc.com','Dev A','$2a$10$Xs4.NukKenO7qIYuM58vAel9Y9eRWyU.BFZKcctydiH5IQR7qXyxK','user');
INSERT INTO jira.`project` VALUES (1,'NCL-W',0,'Nuclear','http://localhost:8081/storage/xlenehrdliyubycvzbimmlhdyogetddffazlxtvscqzuhemcaa_1597074389893.jpg','Nuclear',1,1,NULL,1,1);
INSERT INTO jira.`project_dev_team` VALUES (1,1);
INSERT INTO jira.`role` VALUES (1,'Product Owner'),(2,'Team Lead'),(3,'Team Member'),(4,'Architecture Owner'),(5,'Stakeholder');
INSERT INTO jira.`user_role` VALUES (1,1,1,1),(2,1,1,3);
INSERT INTO jira.`backlog` VALUES (1,NULL,1);
INSERT INTO jira.`sprint` VALUES (1,'2020-08-11 00:00:00',NULL,NULL,'Sprint 1',0,'2020-08-18 00:00:00',1,1),(2,NULL,NULL,NULL,'Sprint 2',1,NULL,0,1),(3,NULL,NULL,NULL,'Sprint 3',2,NULL,-1,1),(4,NULL,NULL,NULL,'Sprint 4',3,NULL,-1,1),(5,NULL,NULL,NULL,'Sprint 5',4,NULL,-1,1),(6,NULL,NULL,NULL,'Sprint 6',5,NULL,-1,1),(7,NULL,NULL,NULL,'Sprint 7',6,NULL,-1,1);
INSERT INTO jira.`issue_type` VALUES (1,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZWHrMjDcbpaMaFGL4CXJuM8tqxcBtYFEu1A&usqp=CAU','Task',NULL),(2,'https://cdn.icon-icons.com/icons2/1808/PNG/512/bug_115148.png','Bug',NULL);
INSERT INTO jira.`issue` VALUES (1,NULL,'Experience with nuclear\'s reactions',NULL,'NCL-W-1',NULL,40,1,1,1,NULL,1,3),(2,NULL,'Take a glance with new toolboxes',NULL,'NCL-W-2',NULL,10,NULL,1,1,NULL,NULL,1),(3,NULL,'Hiring new nuclear scientists',NULL,'NCL-W-3',NULL,15,NULL,1,1,NULL,1,1),(4,NULL,'Hiring 10 guard guys',NULL,'NCL-W-4',NULL,20,NULL,1,1,NULL,1,1),(5,NULL,'Buys 20 nuclear practice tables',NULL,'NCL-W-5',NULL,40,NULL,1,1,NULL,1,1),(6,NULL,'Making a deal and meeting with new nuclear trainning agent',NULL,'NCL-W-6',NULL,10,1,1,1,NULL,1,3);
INSERT INTO jira.`workflow` VALUES (1,'Default WorkFlow',NULL);
INSERT INTO jira.`workflow_item`(id, name, location, color, is_start, is_end, workflow_id) VALUES (1,'Not started','-216 -49','green', 1, 0, 1),(2,'In progress','-32 -48','lightgreen',0,0, 1),(3,'Done','136 -48','blue',0,1, 1);
INSERT INTO jira.`link_workflow` VALUES (1,2),(2,3);
INSERT INTO jira.`priority` VALUES (1,'Low',1),(2,'Medium',2),(3,'High',3);
INSERT INTO jira.`_group` VALUES (1, '4T Team', 1),(2, '5T Team', 1);
INSERT INTO jira.`user_group` VALUES (1,1,2);








