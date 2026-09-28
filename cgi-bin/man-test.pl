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

# use integer;
sub mix32 {
  my ($x) = @_;
  $x &= 0xFFFFFFFF;  
  $x ^= ($x >> 16);
  $x = ($x * 0x85ebca6b) & 0xFFFFFFFF;  
  $x ^= ($x >> 13);
  $x = ($x * 0xc2b2ae35) & 0xFFFFFFFF;  
  $x ^= ($x >> 16);  
  return $x;
}
sub get_unbiased_bucket {
  my ($input_id, $num_buckets) = @_;  
  my $max_hash_val = 0xFFFFFFFF;
  my $limit = $max_hash_val - ($max_hash_val % $num_buckets);  
  my $current_val = $input_id;  
  while (1) {
    my $hashed = mix32($current_val);    
    if ($hashed < $limit) {
      return $hashed % $num_buckets;
    }
    $current_val = $hashed;
  }
}

our %xname = (
  x0 => {
    img => "exam/man-test/certificate-of-man.jpg",
    name => "CERTIFIED MAN",
    desc => "You demonstrate flawless discipline by sacrificing fortitude. You frame your family photos on the wall. Sometimes you type explicit insults in global-chat without looking at who's on the opposing team.",
    manQuotient => '96%',
    testQuotient => '94%',
    sinatraCompliance => '100% (You got banned from a Discord server once for spamming the lyrics to "My Way" in <code>#general</code>)',
    notes => 'Hydraulic relief valve operating at nominal pressure.<br/>Hard knees only.',
  },
  x1 => {
    img => "exam/man-test/indoor-cat.jpg",
    name => "Indoor cat",
    desc => "You know the sink like the back of your hand, but you've never held a sandwich between your teeth while carrying groceries up five flights of stairs.",
    manQuotient => '8%',
    testQuotient => '52%',
    sinatraCompliance => 'Beholden to the whims of The Senate',
    notes => 'The sun probably gets in your eyes a non-integer number of times per day.',
  },
  x2 => {
    img => "exam/kanade/somecrab.jpg",
    name => "Crab",
    desc => "You are crab.",
    manQuotient => 'crab',
    testQuotient => '<span style="letter-spacing:-1px;">crab</span>',
    sinatraCompliance => 'any%',
    notes => 'Your answers didn\'t matter lol',
  },
  x3 => {
    img => "exam/man-test/super-mario-ii.jpg",
    name => "Local Plumber",
    desc => "Licensed and insured. Reasonable rates. Thick accent. Adequate performance.",
    manQuotient => "98%",
    testQuotient => "12%",
    sinatraCompliance => 'non-conforming',
    notes => 'Certified Real Plumbing Plumber.',
  },
  x4 => {
    img => "exam/man-test/windows.jpg",
    name => "SUBURBAN DRIFTER",
    desc => "You use a bootleg copy of Windows XP. Sometimes you scoot the burbs unironically. Big Tap Water Guy. Functionally illiterate.",
    manQuotient => "21%",
    testQuotient => "30%",
    sinatraCompliance => 'Whenever you use your phone, you inevitably get stuck on the prompt that says, "For questions about our print and marketing services, press 2."',
    notes => 'All of the shrubbery surrounding your property has been sickened by an invasive species of fungi, yet you do nothing to stop it.',
  },
  x5 => {
    img => "exam/man-test/wasted.jpg",
    name => "Deceased",
    desc => "You were murdered during your morning commute. Some unhappy mf shot you while you were pulled over on the side of the road swapping out your spare tire. You were instantly annihilated. That's rough, buddy.",
    manQuotient => "80%",
    testQuotient => "50%",
    sinatraCompliance => "0% (you're dead)",
    notes => "It's been several years since that day. Now your wife is dating another guy.<p>Damn.",
  },
  x6 => {
    img => "exam/kanade/says_here_youre_gay.png",
    name => "Hmmm...",
    desc => "Yeah, that sounds about right.",
    manQuotient => "100%",
    testQuotient => "100%",
    sinatraCompliance => '100% ("omg frank\'s just like me fr")',
    notes => ":^)",
  },
  x7 => {
    img => "exam/not-xeon/intel-core-i3-4170.jpg",
    name => "Intel Core i3-4170",
    desc => "Boy am I glad that he's in there and we're out here.",
    manQuotient => "0%",
    testQuotient => "100%",
    sinatraCompliance => 'You are <em>not</em> an Intel Xeon',
    notes => 'This is written on your tombstone:<div style="padding-left:10ch"><code>What a save!<br/>What a save!<br/>What a save!<br/>&lt;Chat disabled for 5 seconds&gt;</code></div>',
  },
);

# WILL IT BLEND?
my $keycount = keys %xname;
my $xind = get_unbiased_bucket($total_sum, $keycount);

my $endpoint = "https://idazntksvlmn.objectstorage.us-ashburn-1.oci.customer-oci.com/n/idazntksvlmn/b/waluigi_servebeer/o";

# assemble it
my $xsel = 'x'.$xind;
my $ximg = $xname{$xsel}{img};
my $the_info = $xname{$xsel}{name};
my $img_src = "$endpoint/$ximg";
my $item_desc = $xname{$xsel}{desc};
my $result_num = $xind+1;

my $manq = $xname{$xsel}{manQuotient};
my $testq = $xname{$xsel}{testQuotient};
my $sincomp = $xname{$xsel}{sinatraCompliance};
my $manotes = $xname{$xsel}{notes};

my $con = <<"END_OF_TEXT";
<div id="info">
  <h2>$the_info</h2>
  <span>$item_desc</span>
  <ul style="padding:0">
    <li><b>Man score:</b> $manq</li>
    <li><b>Test&nbsp; score:</b> $testq</li>
    <li><b>Sinatra lvl:</b> $sincomp</li>
    <li><b>Comment:</b>&nbsp; $manotes</li>
  </ul>
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
