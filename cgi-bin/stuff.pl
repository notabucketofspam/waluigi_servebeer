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

# my $con = "you said $data{agree}?'yes':'no'";
# my $con = "you said ".($data{agree}?'yes':'no');
# my $con = "";
# foreach my ($k,$v) (%data) {
  # $con .= "<code>$k is $v</code>";
# }
my $con = "";
# foreach my $item (@okeys) {
  # $con .= "<p>$item = $data{$item}</p>\n";
# }
$con .= ($data{agree} == 1)?("You are submissive."):("You are obstinate.");

$body =~  s/this is where we put the result/$con/;
my $contentlength = length $body;
# my $contentlength = 0xffff;
print "Content-length: $contentlength\n";
print "\n";
print $body;
