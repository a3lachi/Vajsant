import requests
import sys 


res = ""


if (sys.argv[1]=='destroy') :
  data = {
    'opt':'all',
    'boxes':['e8adc79','c7baa25'],
  }

  res = requests.post('http://127.0.0.1:3333/vagrant/destroy',data=data )


elif (sys.argv[1]=='halt') :
  data = {
    'opt':'all',
    'boxes':['e8adc79','c7baa25'],
  }

  res = requests.post('http://127.0.0.1:3333/vagrant/halt',data=data )




elif (sys.argv[1]=='cm') :
  data = {
    "name":"myMachineNameBrrrrrr",
    "box":"myBoxbrrr",

    "networkType":"private",
    "ip":"9.9.9.9",
    "internalNetworkName":"",
    "portForwards":"",
    
    "provision":"mkdir hahahaha",
    "syncedFolder":"",

    "memory":"4",
    "cpus":"3"
      
    }

  res = requests.post('http://127.0.0.1:3333/vagrant/config/machine',data=data )




elif (sys.argv[1]=='up') :
  res = requests.get('http://127.0.0.1:3333/vagrant/up')




print(res.text)

