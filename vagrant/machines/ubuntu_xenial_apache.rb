
config.vm.define "apache" do |apache|
    apache.vm.provider "virtualbox" do |v|
        v.name = "Ubuntu-apache"
        v.customize ["modifyvm", :id, "--cableconnected1", "on"]
        v.customize ["modifyvm", :id, "--uart1", "0x3F8", "4"]
        v.customize ["modifyvm", :id, "--uartmode1", "file", File::NULL]
        v.gui = true
    end
    apache.vm.box = "ubuntu/xenial64"
    apache.vm.network "public_network", ip: "192.168.0.19", auto_config: false#,bridge: "en1: Wi-Fi (AirPort)" 
    apache.vm.network "forwarded_port", guest: 80, host: 8080, auto_correct: true
    #apache.vm.network "forwarded_port", guest: 22, host: 2235, id: "ssh", auto_correct: true


    apache.vm.provision "shell", "path": "scripts/apache.sh"
end
