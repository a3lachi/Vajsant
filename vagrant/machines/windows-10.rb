nb_machine = 1
(0..nb_machine-1).each do |i|
    config.vm.define "windows-#{i}" do |windows|
        windows.vm.provider "virtualbox" do |v|
            v.name = "windows-10_#{i}"
            v.memory = 1536
            v.cpus = 1
        end
        windows.vm.box = "gusztavvargadr/windows-10"


        # windows.vm.network "private_network"
        windows.vm.network "public_network"#, bridge: "Realtek PCIe GbE Family Controller"
        # windows.vm.network "private_network", ip: "192.168.1.4#{i}", virtualbox__intnet: "internal-network-1"
        windows.vm.network "forwarded_port", guest: 3390, host: 3390, auto_correct: true
        windows.vm.provision "shell", privileged: "true", powershell_elevated_interactive: "true", path: "scripts/enableRDP.ps1"
        # default router
        # windows.vm.provision "shell",
        #     run: "always",
        # inline: "route add 192.168.1.50 MASK 255.255.255.0 192.168.0.1"
        #     inline: "route add default gw 192.168.1.254"

        # default router ipv6
        # config.vm.provision "shell",
        # run: "always",
        # inline: "route -A inet6 add default gw fc00::1 eth1"

        # delete default gw on eth0
        # config.vm.provision "shell",
        # run: "always",
        # inline: "eval `route -n | awk '{ if ($8 ==\"eth0\" && $2 != \"0.0.0.0\") print \"route del default gw \" $2; }'`"
    end
end