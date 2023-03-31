nb_machine = 1
(0..nb_machine-1).each do |i|
    config.vm.define "debian-#{i}" do |debian|
        debian.vm.provider "virtualbox" do |v|
            v.name = "debian_#{i}"
        end
        debian.vm.box = "debian/jessie64"
        debian.vm.network "private_network", ip: "192.168.0.6#{i}", virtualbox__intnet: "internal-network-1"
    end
end