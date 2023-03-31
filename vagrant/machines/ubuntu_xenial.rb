
config.vm.define "brrBrrbrr" do |ubuntu|


    # config.vm.provision "shell", path: "provisionUbuntu.sh"

    config.vm.provision "shell", inline: <<-SHELL
        loadkeys fr ; echo "root:root" | chpasswd ; mkdir brrrbrrr ; 
    SHELL

    # windows.vm.provider "virtualbox" do |v|
    #     v.name = "windows-10_#{i}"
    #     v.memory = 1536
    #     v.cpus = 1
    # end


    ubuntu.vm.provider "virtualbox" do |v|
        v.name = "UbuntuSSS"  # must be unique
    end
    ubuntu.vm.box = "ubuntu/xenial64"
    ubuntu.vm.network "private_network", ip: "192.168.0.23",#type: "dhcp"
    virtualbox__intnet: "defender"
end
