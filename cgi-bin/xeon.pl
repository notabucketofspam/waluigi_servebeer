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

my $con = "";
# $con .= "<p>total items is ".scalar(@okeys)."</p>";
my $pos = 0;
my $acc = 0;
foreach my $item (@okeys) {
  $acc ^= ($data{$item}) << $pos++;
  # $con .= "<p>$item = $data{$item} (acc is $acc)</p>";
}
# $con .= "<p>acc is $acc</p>";
my $endpoint = "https://idazntksvlmn.objectstorage.us-ashburn-1.oci.customer-oci.com/n/idazntksvlmn/b/waluigi_servebeer/o";
my $xind = ($acc&0xF)^(($acc&0xF0)>>4)^(($acc&0xF00)>>8);
# $con .= "<p>xind is $xind</p>";


# Here's all the Xeons that we've got to work with.
%xname = (
  x0 => {
    img => "xeon/e5-1607.jpg",
    name => "Intel Xeon E5-1607",
    desc => "This is a great Xeon. Performance-per-dollar is unmatched. You really lucked out on this one.",
  },
  x1 => {
    img => "xeon/e5440.jpg",
    name => "Intel Xeon E5440",
    desc => "This is the CPU that you give your little brother when he asks you to build him a gaming PC.",
  },
  x2 => {
    img => "xeon/e5520.jpg",
    name => "Intel Xeon E5520",
    desc => "It would make a nice coaster.",
  },
  x3 => {
    img => "xeon/w3503.jpg",
    name => "Intel Xeon W3503",
    desc => "This is a bad Xeon. Don't buy it. If you are this Xeon... my condolences, mate.",
  },
  x4 => {
    img => "not-xeon/amd-athlon-64-x2.jpg",
    name => "AMD Athlon 64 X2",
    desc => "This is not an Intel Xeon... but it <em>is</em> a nice hairbrush!",
  },
  x5 => {
    img => "not-xeon/andes-creme-de-menthe.jpg",
    name => "Andes Creme de Menthe",
    desc => "<i style=\"letter-spacing:2px;\">Indulgence</i>&reg;<br/><sub>Naturally and artificially flavored</sub>",
  },
  x6 => {
    img => "not-xeon/fire-hazard.jpg",
    name => "A fire hazard",
    desc => "I have killed a DIMM slot. I will kill another.",
  },
  x7 => {
    img => "not-xeon/intel-celeron-d-325.jpg",
    name => "Intel Celeron D 325",
    desc => "Just like grandma used to bake.",
  },
  x8 => {
    img => "not-xeon/intel-core-i3-4170.jpg",
    name => "Intel Core i3-4170",
    desc => "Boy am I glad that he's in there and we're out here.",
  },
  x9 => {
    img => "not-xeon/intel-core-i5-650.jpg",
    name => "Intel Core i5-650",
    desc => "Built on Nephalem for that nostalgic Core gen-one feeling.",
  },
  x10 => {
    img => "not-xeon/intel-pentium-4-631.jpg",
    name => "Intel Pentium 4 631",
    desc => "Mankind peaked at Socket T (LGA 775).",
  },
  x11 => {
    img => "not-xeon/intel-pentium-4-sl7e2.jpg",
    name => "Intel Pentium 4 SL7E2",
    desc => "That's a real nice SKU. You are proud and dominant of your territory. You dislike sunrise.",
  },
  x12 => {
    img => "not-xeon/intel-pentium-g2020.jpg",
    name => "Intel Pentium G2020",
    desc => "2020 was not a great year. G2020 was not a great Pentium.<br/><br/>Such is life.",
  },
  x13 => {
    img => "not-xeon/intel-pentium-g2030.jpg",
    name => "Intel Pentium G2030",
    desc => "2030 will be my year for sure. G2030 will be my Pentium for sure.<br/><br/><sub>... for sure.</sub>",
  },
  x14 => {
    img => "not-xeon/samsung-nvme.jpg",
    name => "Samsung NVMe SSD",
    desc => "Samsung is known to the State of California. <b>You have been warned.</b>",
  },
  x15 => {
    img => "not-xeon/super-talent-ram.jpg",
    name => "Super Talent 512MB DDR-400 PC3200",
    desc => "Who needs (G.)Skill when you have (Super) Talent?",
  },
);

# Assemble it into something useful.
my $xsel = 'x'.$xind;
my $ximg = $xname{$xsel}{img};
$con .= "<div id=\"info\"><h2>$xname{$xsel}{name}</h2>";
$con .= ($ximg =~ /^not/)?("<h3>You are <em>not</em> an Intel Xeon</h3>"):("<h3>Genuine Intel&reg; Xeon&reg;</h3>");
$con .= "<span>$xname{$xsel}{desc}</span>";
$con .= "</div><div>";
$con .= "<img src=\"$endpoint/exam/$ximg\" onclick=\"openimg(this.src)\"/>";
$con .= "<small>This is result #".($xind+1)." of 16</small></div>";

$body =~  s/this is where we put the result/$con/;
my $contentlength = length $body;
print "Content-length: $contentlength\n";
print "\n";
print $body;
# Note to self: line endings need to be Unix (LF)
