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
my $n = read ($fh, $body, 0xffff);
my $endpoint = "https://idazntksvlmn.objectstorage.us-ashburn-1.oci.customer-oci.com/n/idazntksvlmn/b/waluigi_servebeer/o";

my $phrase = ($data{agree} == 1)?"submissive":"obstinate";
my $imgsrc = ($data{agree} == 1)?"/exam/eula/easy3.png":"/image/the_newest_stuff/clown2.png";
my $resnum = ($data{agree} == 1)?"2":"1";
my $con = "<div id=\"info\">You are $phrase.</div><div><img src=\"$endpoint$imgsrc\" onclick=\"openimg(this.src)\"/></div>";

$body =~  s/this is where we put the result/$con/;
my $contentlength = length $body;
# my $contentlength = 0xffff;
print "Content-length: $contentlength\n";
print "\n";
print $body;
