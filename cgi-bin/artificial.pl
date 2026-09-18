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

# make the sum
my $total_sum = 0;
foreach my $item (@okeys) {
    $total_sum += int($data{$item});
}

%xname = (
  x0 => {
    img => "exam/kanade/some-consoles.jpg",
    name => "One of These Poor Consoles",
    desc => "You belong nowhere. You do not officially exist. You are a void space, waiting to be overwritten by someone else's passions. You are a solitary echo endlessly bouncing through a dark tunnel. That's why you thrive on Reddit.",
  },
  x1 => {
    img => "exam/kanade/adaptive-led-floor-sign.jpg",
    name => "ADAPTIVE LED FLOOR SIGN",
    desc => "35\"W x 68\"H x 20\"D<br/><br/>SIGN DOES LIGHT AND POWER ON THROUGH CYCLE<br/>UNSURE HOW TO PROGRAM THE ITEM",
  },
  x2 => {
    img => "exam/kanade/somecrab.jpg",
    name => "Crab",
    desc => "You are crab.",
  },
  x3 => {
    img => "exam/kanade/Opus_logo2.png",
    name => "Sentient Audio Codec",
    desc => "You are the ghost of a poorly-optimized port of FFmpeg. You spend your days attempting to apply volume normalization to the ambient noise of a grocery store. Your emotional state is best described as \"Variable Bitrate.\"",
  },
  x4 => {
    img => "image/very_newer_stuff/the-south-Korean-DMZ-from-the-perspective-of-a-North-Korean-soldier-but-the-south-Korean-DMZ-is-sponsored-by-banquet-frozen-dinners.jpg",
    name => "The South Korean DMZ from the perspective of a North Korean soldier but the South Korean DMZ is sponsored by Banquet frozen dinners",
    desc => "Brought to you by Banquet&reg;",
  },
  x5 => {
    img => "exam/not-xeon/super-talent-ram.jpg",
    name => "Super Talent 512MB DDR-400 PC3200",
    desc => "I'm you from the future.",
  },
  x6 => {
    img => "exam/kanade/says_here_youre_gay.png",
    name => "Hmmm...",
    desc => "Yeah, that sounds about right.",
  }
);

# WILL IT BLEND?
my $keycount = keys %xname;
my $xind = (($total_sum * 101) + 17) % $keycount;

my $endpoint = "https://idazntksvlmn.objectstorage.us-ashburn-1.oci.customer-oci.com/n/idazntksvlmn/b/waluigi_servebeer/o";

# assemble it
my $xsel = 'x'.$xind;
my $ximg = $xname{$xsel}{img};
my $the_info = $xname{$xsel}{name};
my $img_src = "$endpoint/$ximg";
my $item_desc = $xname{$xsel}{desc};
my $result_num = $xind+1;

my $con = <<"END_OF_TEXT";
<div id="info">
  <h2>$the_info</h2>
  <span>$item_desc</span>
</div>
<div>
  <img src="$img_src" onclick="openimg(this.src)"/>
  <small>This is result #$result_num of $keycount</small>
</div>
END_OF_TEXT

$body =~  s/this is where we put the result/$con/;
my $contentlength = length $body;
print "Content-length: $contentlength\n";
print "\n";
print $body;

#  7. Once the garlic butter-defies gravity and curls horizontally, you are legally in another dimension.
#  8. The peeling purple clearcoat perfectly mimics the spiritual signature of extreme commuter velocity.
#  9. Unpaid bins create a wormhole in the semiconductor lattice, leaking future bureaucracy into the silicon.
# 10. Hyper-temporal dictates retroactively acknowledging the anomaly before it manifests.
