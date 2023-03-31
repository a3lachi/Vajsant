config.vm.define "myMachineNameBrrrrrr" do |myConf|

  config.vm.provision "shell", inline: <<-SHELL
    mkdir hahahaha
  SHELL

  windows.vm.provider "virtualbox" do |v|
    v.name = "myMachineNameBrrrrrr"
    v.memory = 4
    v.cpus = 3
  end

  myConf.vm.box = "myBoxbrrr"

  myConf.vm.network "private", ip: "9.9.9.9"


end