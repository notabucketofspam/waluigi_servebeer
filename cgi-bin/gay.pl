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
# my $con = "<style>p{display:none}</style><div>";
# my $pos = 0;
# my $acc = 0;
# foreach my $item (@okeys) {
  # $acc ^= ($data{$item}) << $pos++;
  # $con .= "<p>$item = $data{$item} (acc is $acc)</p>";
# }
my $con = "<div id=\"info\">Yeah, that sounds about right.</div>";
$con .= "<div><img src=\"$endpoint/exam/kanade/says_here_youre_gay.png\" onclick=\"openimg(this.src)\"/><small>This is result #1 of 1</small></div>";

$body =~  s/this is where we put the result/$con/;
my $contentlength = length $body;
print "Content-length: $contentlength\n";
print "\n";
print $body;
