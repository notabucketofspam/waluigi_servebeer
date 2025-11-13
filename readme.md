[waluigi-servebeer.com](https://waluigi-servebeer.com)

there's also some dependencies:

- Perl
    1. `sudo cpan App::cpanminus`
    2. `sudo cpanm CGI::Lite`
- Node.js
    - needed for [ClockBot](https://github.com/notabucketofspam/clockbot) and [Online](https://github.com/notabucketofspam/online)

---

Apache VirtualHost config
<details>
  <summary>for normal people</summary>
    
```
#
# Setup for waluigi-servebeer.com
#
<VirtualHost *:80>
  ServerName waluigi-servebeer.com
  Redirect permanent "/" "https://waluigi-servebeer.com"
</VirtualHost>
<VirtualHost *:443>
  DocumentRoot "/httpd/waluigi_servebeer/html"
  ServerName waluigi-servebeer.com
  Header add Cache-Control max-age=1200

  <Directory "/httpd/waluigi_servebeer">
    AllowOverride None
    Require all granted
  </Directory>
  <Directory "/httpd/waluigi_servebeer/html">
    AllowOverride None
    Options Indexes FollowSymLinks
    Require all granted
  </Directory>
  <Directory "/httpd/waluigi_servebeer/cgi-bin">
    AllowOverride None
    Options None
    Require all granted
  </Directory>
  ScriptAlias /cgi-bin/ "/httpd/waluigi_servebeer/cgi-bin/"
  
  <Location "/cmd">
    ProxyPass "http://localhost:39692/cmd"
    ProxyPassReverse "http://localhost:39692/cmd"
  </Location>
  <Location "/login">
    ProxyPass "http://localhost:39600"
    ProxyPassReverse "http://localhost:39600"
  </Location>
  <Location "/api">
    ProxyPass "http://localhost:39600/api"
    ProxyPassReverse "http://localhost:39600/api"
  </Location>
  
  SSLEngine On
  SSLCertificateFile "/etc/letsencrypt/live/waluigi-servebeer.com/fullchain.pem"
  SSLCertificateKeyFile "/etc/letsencrypt/live/waluigi-servebeer.com/privkey.pem"
  Include "/etc/letsencrypt/options-ssl-apache.conf"
</VirtualHost>
```
</details>

<details>
  <summary>for Ubuntu users</summary>
  
```
<IfModule mod_ssl.c>
<VirtualHost *:443>
  DocumentRoot "/httpd/waluigi_servebeer/html"
  ServerName waluigi-servebeer.com
  Header add Cache-Control max-age=1200
  
  <Directory "/httpd/waluigi_servebeer">
    AllowOverride None
    Require all granted
  </Directory>
  <Directory "/httpd/waluigi_servebeer/html">
    AllowOverride None
    Options Indexes FollowSymLinks
    Require all granted
  </Directory>
  <Directory "/httpd/waluigi_servebeer/cgi-bin">
    AllowOverride None
    Options None
    Require all granted
  </Directory>
  ScriptAlias /cgi-bin/ "/httpd/waluigi_servebeer/cgi-bin/"

  <Location "/cmd">
    ProxyPass "http://localhost:39692/cmd"
    ProxyPassReverse "http://localhost:39692/cmd"
  </Location>
  <Location "/login">
    ProxyPass "http://localhost:39600"
    ProxyPassReverse "http://localhost:39600"
  </Location>
  <Location "/api">
    ProxyPass "http://localhost:39600/api"
    ProxyPassReverse "http://localhost:39600/api"
  </Location>

  SSLCertificateFile /etc/letsencrypt/live/waluigi-servebeer.com/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/waluigi-servebeer.com/privkey.pem
  Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>
```
</details>
