nb_machine = 1
(0..nb_machine-1).each do |i|
    config.vm.define "kali-#{i}" do |kali|
        kali.vm.provider "virtualbox" do |v|
            v.name = "kali_#{i}"
        end
        kali.vm.box = "kalilinux/rolling"
        

        kali.vm.network "public_network"# , bridge: "Realtek PCIe GbE Family Controller"
        # kali.vm.network "private_network"# , type: "dhcp"
        # kali.vm.network "private_network", ip: "192.168.1.5#{i}", virtualbox__intnet: "internal-network-1"
        kali.vm.provision "shell", privileged: "true", path: "scripts/crowbar.sh"
        # kali.vm.provision "shell",
        #    run: "always",
        # inline: "route add 192.168.1.50 MASK 255.255.255.0 192.168.0.1"
        #    inline: "route add default gw 192.168.1.254"


        kali.vm.synced_folder '.', '/vagrant', disabled: true
    end
end