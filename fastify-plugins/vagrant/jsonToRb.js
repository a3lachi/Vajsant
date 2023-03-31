const fs = require('fs');







const JsonToRuby = (machine , path) => {

  console.log('Writing config for',machine.name,'in folder',path)

  const filePath = path+'/machines/example.rb';

  // START
  var fileContent = 'config.vm.define "' + machine.name + '" do |myConf|\n\n'

  // PROVISION WITH COMMAND
  fileContent += '  config.vm.provision "shell", inline: <<-SHELL\n'
  fileContent += '    '+machine.provision+'\n'
  fileContent += '  SHELL\n\n'

  // NAME, MEMORY, CPUS
  fileContent += '  windows.vm.provider "virtualbox" do |v|\n'
  fileContent += '    v.name = "'+machine.name+'"\n'
  fileContent += '    v.memory = '+machine.memory+'\n'
  fileContent += '    v.cpus = '+machine.cpus+'\n'
  fileContent += '  end\n\n'

  // Provider
  fileContent += '  myConf.vm.box = "'+machine.box+'"\n\n'

  // Network
  fileContent += '  myConf.vm.network "'+machine.networkType +'", ip: "'+machine.ip+'"\n\n'


  // END
  fileContent += "\nend"

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw err;
  });


}



module.exports = JsonToRuby;