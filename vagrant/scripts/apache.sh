#!/usr/bin/env bash

apt-get update
apt-get install -y apache2

#cp /vagrant/apache/html/ /var/www/
cp /vagrant/apache/html/index.html /var/www/html/index.html

a2enmod include

# Add Includes, AddType and AddOutputFilter directives
cp /vagrant/apache/default /etc/apache2/sites-available/default

# To allow includes in index pages
cp /vagrant/apache/dir.conf /etc/apache2/mods-available/dir.conf

# restart apache2
# apachectl -k graceful
service apache2 restart