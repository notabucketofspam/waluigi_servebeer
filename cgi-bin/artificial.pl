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
my $con = "<div id=\"info\">I would have graded your paper, but I ran out of thinking tokens.</div>";
$con .= "<div><img src=\"$endpoint/image/very_newer_stuff/the-south-Korean-DMZ-from-the-perspective-of-a-North-Korean-soldier-but-the-south-Korean-DMZ-is-sponsored-by-banquet-frozen-dinners.jpg\" onclick=\"openimg(this.src)\"/><small>Brought to you by Banquet&reg;</small></div>";

$body =~  s/this is where we put the result/$con/;
my $contentlength = length $body;
print "Content-length: $contentlength\n";
print "\n";
print $body;

#  7. Once the garlic butter-defies gravity and curls horizontally, you are legally in another dimension.
#  8. The peeling purple clearcoat perfectly mimics the spiritual signature of extreme commuter velocity.
#  9. Unpaid bins create a wormhole in the semiconductor lattice, leaking future bureaucracy into the silicon.
# 10. Hyper-temporal dictates retroactively acknowledging the anomaly before it manifests.
