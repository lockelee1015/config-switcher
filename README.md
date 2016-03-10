# config-switcher
use command to switch java.properties

###how to install  
```
npm install -g config-switcher
```

###for example  

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
