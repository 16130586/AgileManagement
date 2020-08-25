
LOCK TABLES `_group` WRITE;
/*!40000 ALTER TABLE `_group` DISABLE KEYS */;
INSERT INTO `_group` VALUES (1,'4T Team',1),(2,'5T Team',1);
/*!40000 ALTER TABLE `_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `backlog`
--

LOCK TABLES `backlog` WRITE;
/*!40000 ALTER TABLE `backlog` DISABLE KEYS */;
INSERT INTO `backlog` VALUES (1,NULL,1);
/*!40000 ALTER TABLE `backlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `issue`
--

LOCK TABLES `issue` WRITE;
/*!40000 ALTER TABLE `issue` DISABLE KEYS */;
INSERT INTO `issue` VALUES (1,NULL,'Experience with nuclear\'s reactions',NULL,'NCL-W-1',NULL,40,1,1,1,2,1,3),(2,NULL,'Take a glance with new toolboxes',NULL,'NCL-W-2',0,30,1,1,1,3,2,3),(3,NULL,'Hiring new nuclear scientists',NULL,'NCL-W-3',NULL,15,2,1,1,2,1,3),(4,NULL,'Hiring 10 guard guys',NULL,'NCL-W-4',NULL,20,2,1,1,2,1,3),(5,NULL,'Buys 20 nuclear practice tables',NULL,'NCL-W-5',NULL,40,2,1,1,2,1,3),(6,NULL,'Making a deal and meeting with new nuclear trainning agent',NULL,'NCL-W-6',NULL,10,1,1,1,2,1,3),(7,NULL,'Through a collection of almost 180 artworks',NULL,'NCL-W-7',0,30,1,1,1,2,2,3),(8,NULL,'Dramatic oil paintings of heroic doctors',NULL,'NCL-W-8',0,30,2,1,1,2,2,3),(9,NULL,'But given that the country heavily',NULL,'NCL-W-9',0,30,2,1,1,3,2,3),(10,NULL,'Once inside the exhibition',NULL,'NCL-W-10',0,20,1,1,1,2,3,3),(11,NULL,'Take the large-scale triptych by Pang Maokun',NULL,'NCL-W-11',0,25,2,1,1,3,3,3),(12,NULL,'And while many of the subjects are unidentified',NULL,'NCL-W-12',0,30,2,1,1,2,3,3),(13,NULL,'Other themes addressed in the exhibition',NULL,'NCL-W-13',0,20,2,1,1,2,4,3),(14,NULL,'Construction workers, infection control staff',NULL,'NCL-W-14',0,10,2,1,1,1,4,3),(15,NULL,'In addition to paintings, the art on display',NULL,'NCL-W-15',0,20,1,1,2,3,4,3),(16,NULL,'Little information is provided',NULL,'NCL-W-16',0,10,2,1,1,1,4,3),(17,NULL,'Xi also used the landmark speech',NULL,'NCL-W-17',0,10,2,1,2,1,5,1),(18,NULL,'There are elements of truth beneath',NULL,'NCL-W-18',0,10,1,1,1,1,5,1),(19,NULL,'The world\'s most populous country',NULL,'NCL-W-19',0,20,1,1,1,3,5,2),(20,NULL,'Nonetheless, visitors to the museum',NULL,'NCL-W-20',0,20,2,1,1,2,5,2),(21,NULL,'The National Museum of China is not the only cultural institution',NULL,'NCL-W-21',0,10,2,1,1,1,5,1);
/*!40000 ALTER TABLE `issue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `issue_type`
--

LOCK TABLES `issue_type` WRITE;
/*!40000 ALTER TABLE `issue_type` DISABLE KEYS */;
INSERT INTO `issue_type` VALUES (1,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZWHrMjDcbpaMaFGL4CXJuM8tqxcBtYFEu1A&usqp=CAU','Task',NULL),(2,'https://itviec.com/blog/wp-content/uploads/2017/09/bug-e1563434408457.jpg','Bug',NULL);
/*!40000 ALTER TABLE `issue_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `link_issue`
--

LOCK TABLES `link_issue` WRITE;
/*!40000 ALTER TABLE `link_issue` DISABLE KEYS */;
/*!40000 ALTER TABLE `link_issue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `link_workflow`
--

LOCK TABLES `link_workflow` WRITE;
/*!40000 ALTER TABLE `link_workflow` DISABLE KEYS */;
INSERT INTO `link_workflow` VALUES (1,2),(2,3);
/*!40000 ALTER TABLE `link_workflow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `log_transaction`
--

LOCK TABLES `log_transaction` WRITE;
/*!40000 ALTER TABLE `log_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `logwork`
--

LOCK TABLES `logwork` WRITE;
/*!40000 ALTER TABLE `logwork` DISABLE KEYS */;
INSERT INTO `logwork` VALUES (1,'2020-08-17 15:53:17',1,2,1),(2,'2020-08-17 15:53:40',1,2,2),(3,'2020-08-17 15:55:34',0.5,2,3),(4,'2020-08-17 15:56:23',0.3,2,3),(5,'2020-08-17 15:58:02',1,2,4),(6,'2020-08-17 16:04:30',1,2,5),(7,'2020-08-17 16:04:59',0.8,2,6),(8,'2020-08-17 16:05:33',1,2,7),(9,'2020-08-17 16:05:55',2,2,8),(10,'2020-08-17 16:07:21',1,1,9),(11,'2020-08-17 16:07:38',1.5,1,10),(12,'2020-08-17 16:14:06',1,1,11),(13,'2020-08-17 16:14:43',0.5,1,12),(14,'2020-08-17 16:16:57',1,1,13),(15,'2020-08-17 16:17:07',1,1,14),(16,'2020-08-17 16:18:29',0.5,1,15),(17,'2020-08-17 16:18:42',1.5,1,16),(18,'2020-08-17 16:20:07',1,2,17),(19,'2020-08-17 16:20:22',1,2,18),(20,'2020-08-17 16:22:42',1,2,19),(21,'2020-08-17 16:24:54',1,2,20),(22,'2020-08-17 19:33:39',1,1,21),(23,'2020-08-17 19:33:53',1.5,1,22),(24,'2020-08-17 21:07:26',1,2,23),(25,'2020-08-17 21:07:46',2,2,24),(26,'2020-08-18 21:08:18',2,2,25),(27,'2020-08-18 21:08:43',1,2,26),(28,'2020-08-18 21:11:34',1,1,27),(29,'2020-08-18 21:11:34',2,1,28),(30,'2020-08-18 21:11:34',1,2,29),(31,'2020-08-19 21:13:51',2,2,30),(32,'2020-08-19 21:13:51',1,2,31),(33,'2020-08-19 21:13:51',0.5,2,32),(34,'2020-08-19 21:13:51',1,2,33),(35,'2020-08-20 21:14:44',1.5,2,34),(36,'2020-08-20 21:14:44',1,1,35),(37,'2020-08-20 21:14:44',3,1,35),(38,'2020-08-20 21:14:44',1.5,1,36),(39,'2020-08-21 21:17:11',1,1,37),(40,'2020-08-21 21:17:11',1,1,38),(41,'2020-08-21 21:17:11',1,2,44),(42,'2020-08-21 21:17:11',2,2,43),(43,'2020-08-22 21:17:11',1,2,41),(44,'2020-08-22 21:17:11',1,2,42);
/*!40000 ALTER TABLE `logwork` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `priority`
--

LOCK TABLES `priority` WRITE;
/*!40000 ALTER TABLE `priority` DISABLE KEYS */;
INSERT INTO `priority` VALUES (1,'Low',1),(2,'Medium',2),(3,'High',3);
/*!40000 ALTER TABLE `priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'NCL-W',0,'Nuclear','https://theecologist.org/sites/default/files/styles/inline_l/public/NG_media/358443.jpg?itok=ioS3xzIJ','Nuclear',1,1,NULL,1,1);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project_dev_team`
--

LOCK TABLES `project_dev_team` WRITE;
/*!40000 ALTER TABLE `project_dev_team` DISABLE KEYS */;
INSERT INTO `project_dev_team` VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `project_dev_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Product Owner'),(2,'Team Lead'),(3,'Team Member'),(4,'Architecture Owner'),(5,'Stakeholder');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sprint`
--

LOCK TABLES `sprint` WRITE;
/*!40000 ALTER TABLE `sprint` DISABLE KEYS */;
INSERT INTO `sprint` VALUES (1,'2020-08-15 00:00:00','2020-07-23 16:15:18',NULL,'Sprint 1',0,'2020-07-22 00:00:00',2,1),(2,'2020-07-23 07:00:00','2020-08-01 16:26:32',NULL,'Sprint 2',1,'2020-08-01 07:00:00',2,1),(3,'2020-08-01 07:00:00','2020-08-09 21:09:02',NULL,'Sprint 3',2,'2020-08-08 07:00:00',2,1),(4,'2020-08-09 07:00:00','2020-08-17 21:16:07',NULL,'Sprint 4',3,'2020-08-17 07:00:00',2,1),(5,'2020-08-17 07:00:00',NULL,NULL,'Sprint 5',4,'2020-08-24 07:00:00',1,1),(6,NULL,NULL,NULL,'Sprint 6',5,NULL,0,1),(7,NULL,NULL,NULL,'Sprint 7',6,NULL,0,1);
/*!40000 ALTER TABLE `sprint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `subtask`
--

LOCK TABLES `subtask` WRITE;
/*!40000 ALTER TABLE `subtask` DISABLE KEYS */;
INSERT INTO `subtask` VALUES (1,'NCL-W-3-1',NULL,3,'White Board',1,3,3),(2,'NCL-W-3-2',NULL,2,'Document Design',2,3,3),(3,'NCL-W-3-3',NULL,1,'Do the task',2,3,3),(4,'NCL-W-3-4',NULL,2,'Release note',2,3,3),(5,'NCL-W-4-1',NULL,1,'White Board',2,4,3),(6,'NCL-W-4-2',NULL,1,'Test Plan',2,4,3),(7,'NCL-W-5-1',NULL,2,'White Board',2,5,3),(8,'NCL-W-5-2',NULL,3,'Document Design',2,5,3),(9,'NCL-W-1-1',NULL,2,'White Board',1,1,1),(10,'NCL-W-1-2',NULL,3,'Document Design',1,1,3),(11,'NCL-W-6-1',NULL,2,'White Board',1,6,3),(12,'NCL-W-6-2',NULL,1,'Document Design',1,6,3),(13,'NCL-W-2-1',NULL,2,'White Board',1,2,3),(14,'NCL-W-2-2',NULL,2,'Document Design',1,2,3),(15,'NCL-W-7-1',NULL,2,'white board',1,7,3),(16,'NCL-W-7-2',NULL,1,'document design',1,7,3),(17,'NCL-W-8-1',NULL,2,'White board',2,8,3),(18,'NCL-W-8-2',NULL,1,'document design',2,8,3),(19,'NCL-W-9-1',NULL,2,'White board',2,9,3),(20,'NCL-W-9-2',NULL,2,'document design',2,9,3),(21,'NCL-W-10-1',NULL,2,'white board',1,10,3),(22,'NCL-W-10-2',NULL,2,'document design',1,10,3),(23,'NCL-W-11-1',NULL,2,'white board',2,11,3),(24,'NCL-W-11-2',NULL,3,'document design',2,11,3),(25,'NCL-W-12-1',NULL,1,'white board',2,12,3),(26,'NCL-W-12-2',NULL,2,'document design',2,12,3),(27,'NCL-W-15-1',NULL,2,'white board',1,15,3),(28,'NCL-W-15-2',NULL,3,'document design',1,15,3),(29,'NCL-W-13-1',NULL,2,'white board',2,13,3),(30,'NCL-W-13-2',NULL,2,'document design',2,13,3),(31,'NCL-W-14-1',NULL,3,'white board',2,14,1),(32,'NCL-W-14-2',NULL,1,'document design',2,14,3),(33,'NCL-W-16-1',NULL,2,'white board',2,16,3),(34,'NCL-W-16-2',NULL,1,'document design',2,16,3),(35,'NCL-W-19-1',NULL,2,'white board',1,19,2),(36,'NCL-W-19-2',NULL,2,'document design',1,19,1),(37,'NCL-W-18-1',NULL,2,'white board',1,18,1),(38,'NCL-W-18-2',NULL,2,'document design',1,18,1),(39,'NCL-W-20-1',NULL,2,'white board',2,20,2),(40,'NCL-W-20-2',NULL,NULL,'document design',NULL,20,1),(41,'NCL-W-17-1',NULL,1.5,'white board',2,17,1),(42,'NCL-W-17-2',NULL,2,'document design',2,17,1),(43,'NCL-W-21-1',NULL,2.5,'white board',2,21,1),(44,'NCL-W-21-2',NULL,1,'document design',2,21,1);
/*!40000 ALTER TABLE `subtask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `transaction_type`
--

LOCK TABLES `transaction_type` WRITE;
/*!40000 ALTER TABLE `transaction_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtxGy67tYnzbu9_weh3S2nIexg8eqVLP1HcA&usqp=CAU','admin@xyz.com','Administrator','$2a$10$Xs4.NukKenO7qIYuM58vAel9Y9eRWyU.BFZKcctydiH5IQR7qXyxK','admin@xyz.com'),(2,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSS8qtvIlXMXe3Yazw614v0A69ieNBHdBFeeA&usqp=CAU','user@abc.com','Dev A','$2a$10$Xs4.NukKenO7qIYuM58vAel9Y9eRWyU.BFZKcctydiH5IQR7qXyxK','user@abc.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES (1,1,2);
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,1,1),(2,1,3,2),(3,1,2,1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `velocity`
--

LOCK TABLES `velocity` WRITE;
/*!40000 ALTER TABLE `velocity` DISABLE KEYS */;
INSERT INTO `velocity` VALUES (1,'2020-07-23 16:15:18',1,1,'Sprint 1',125,100),(2,'2020-08-01 16:26:32',1,2,'Sprint 2',120,90),(3,'2020-08-09 21:09:02',1,3,'Sprint 3',75,75),(4,'2020-08-17 21:16:07',1,4,'Sprint 4',60,60);
/*!40000 ALTER TABLE `velocity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `workflow`
--

LOCK TABLES `workflow` WRITE;
/*!40000 ALTER TABLE `workflow` DISABLE KEYS */;
INSERT INTO `workflow` VALUES (1,'Default WorkFlow',NULL);
/*!40000 ALTER TABLE `workflow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `workflow_item`
--

LOCK TABLES `workflow_item` WRITE;
/*!40000 ALTER TABLE `workflow_item` DISABLE KEYS */;
INSERT INTO `workflow_item` VALUES (1,'blue',0,1,'-150 0','Not started',NULL,1),(2,'gray',0,0,'0 0','In progress',NULL,1),(3,'green',1,0,'150 0','Done',NULL,1);
/*!40000 ALTER TABLE `workflow_item` ENABLE KEYS */;
UNLOCK TABLES;
