nb_machine = 1
(0..nb_machine-1).each do |i|
    config.vm.define "laravel-#{i}" do |laravel|
        laravel.vm.provider "virtualbox" do |v|
            v.name = "laravel_#{i}"
        end
        laravel.vm.box = "laravel/homestead"
        laravel.vm.network "public_network", ip: "192.168.0.4#{i}"
    end
end