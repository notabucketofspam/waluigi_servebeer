#!/usr/bin/perl
print "Content-type: text/html\n";
use CGI::Lite ();
my $cgi = CGI::Lite->new ();
my %data = $cgi->parse_form_data('POST');
my @okeys = $cgi->get_ordered_keys;

my $fh = undef;
my $fp = '../html/page/personality-exam/result.html';
open ($fh, "< :encoding(UTF-8)", $fp);
my $body = undef;
read ($fh, $body, 0xffff);

my $endpoint = "https://idazntksvlmn.objectstorage.us-ashburn-1.oci.customer-oci.com/n/idazntksvlmn/b/waluigi_servebeer/o";
my $con = "<div id=\"info\">You are crab.</div>";
$con .= "<div><img src=\"$endpoint/exam/kanade/somecrab.jpg\" onclick=\"openimg(this.src)\"/><small>Your answers didn't matter lol</small></div>";

$body =~  s/this is where we put the result/$con/;
my $contentlength = length $body;
print "Content-length: $contentlength\n";
print "\n";
print $body;
