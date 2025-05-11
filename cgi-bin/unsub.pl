#!/usr/bin/perl
print "Content-type: text/html\n";
use CGI::Lite ();
my $cgi = CGI::Lite->new ();
my %data = $cgi->parse_form_data('POST');
my @okeys = $cgi->get_ordered_keys;

my $fh = undef;
my $fp = '../html/page/personality-exam/result.html';
my $ok = open ($fh, "< :encoding(UTF-8)", $fp);
my $body = undef;
read ($fh, $body, 0xffff);

my $con = "
<style>h3{display:none}u{white-space:nowrap}</style>
<script>
  document.querySelector('h1').innerText = 'Thank you for your feedback!';
  document.title = 'Feedback';
</script>
<div id=\"info\">
  <p style=\"text-align:center;margin-top:0\">Thank you for visiting WALUIGI-SERVEBEER.COM!</p>
  <p>Feedback from our users is very important to us. At <u>waluigi-servebeer.com</u>, we value our users and their feedback. We pride ourselves on our commitment to our valuable users and their provided feedback. Our users are very important to us, as is the feedback that they provide. We hope that, as you continue to enjoy <u>waluigi-servebeer.com</u>, you continue to provide valuable feedback as a very-important user.</p>
  <p>Our commitment to our users is paramount. I hope you feel good about yourself. If there's anything else that we can do to value our users, please provide feedback in the valuable user input feedback form. Our users are our specialty; no other users have ever been as valuable as ours. Your feedback, and yours alone, helps to feed the back of the content posted on <u>waluigi-servebeer.com</u>, as does your important value. Thank you, as always, for choosing us.</p>
  <p style=\"text-align:center\">We hope you continue to enjoy WALUIGI-SERVEBEER.COM!</p>
</div>
<img src=\"/page/hardware-store/smiling-face-with-tear.png\" onclick=\"openimg(this.src)\" style=\"align-self:center\"/>
";

$body =~  s/this is where we put the result/$con/;
my $contentlength = length $body;
print "Content-length: $contentlength\n";
print "\n";
print $body;
