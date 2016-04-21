# config-switcher
use command to switch java.properties

use command to fetch java.properties from remote database

###how to install  
```
npm install -g config-switcher
```

###for example  

####switch java.properties

this is a java properties file  `jdbc.properties`

```
#(dev)
#jdbc.url=jdbc:oracle:thin:@192.168.1.8:1521:ORCL
#(test)
jdbc.url=jdbc:oracle:thin:@192.168.1.58:1521:ORCL
#()
jdbc.username=username
jdbc.password=pwd
jdbc.maxConnectionsPerPartition=10
jdbc.partitionCount=3
sql.sqlRootFile=conf/sql
sql.dialect=oracle
```
You need use `#(config-name)` to split the different config  
then open your terminal
```
  config-switcher -f jdbc -c dev
```
then the part dev will be uncommented and the other will be commented

`#()` means stop to switch  
all the k-v below `#()` will not be affect
`-f` is the file you wanna to switch.do not need at `.properties`
`-c` is the config name you wanna to switch

welcome to issue and pr.

####fetch java.properties from database
firstly, you need to ensure that `.configrc` is actually existed in  the root path of you project. this is an example of `.configrc` 

```
{
    "project_name":"ai",
    "config_map":{
        "jdf":"src/conf/jdf.properties",
        "jfwai":"src/conf/plugin/jfwai.properties",
        "jfwailog":"src/conf/plugin/jfwailog.properties"
    }
}
```
then use command 
```
  config-switcher -a 
```
or 
```
  config-switcher --auto
```
you could receive a json data looks just like

```
{
	"jdf":[
		{
			"key":"jdbc.url"
			"value":"jdbc:oracle:thin:@192.168.88.168:1521/HIPDB"
		},
		{
			"key":"jdbc.driverClassName"
			"value":"oracle.jdbc.driver.OracleDriver"
		}
		...
	],
	"jfwai":[
		{
			"key":"jfwai.jdbc.jfwaidata.url"
			"value":"jdbc:oracle:thin:@192.168.88.168:1521/HIPDB"
		},
		...
	],
	"jfwailog":[
		{
			"key":"jfwailog.mongo.db.host"
			"value":"192.168.82.11:27017"
		},
		...
	]
	
}
```

the json data will be written into relative `.properties` files 
according to .configrc file automatically.

###release note

###v1.2.0
Now you can switch config for the all directory, alternatively you can choose to fetch properties from database
```
    config-switcher -d DIR -c CONFIG
```