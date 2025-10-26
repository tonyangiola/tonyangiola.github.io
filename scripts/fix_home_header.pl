use strict; use warnings; local $/ = undef;

my $hdr_file = shift @ARGV or die "need header file\n";
my $home     = shift @ARGV or die "need index.html\n";

open my $HF, '<', $hdr_file or die $!;
my $HDR = <$HF>; close $HF;

open my $IN, '<', $home or die $!;
my $d = <$IN>; close $IN;

# remove any well-formed <header>…</header>
my $changed = ($d =~ s{<header\b[^>]*>.*?</header>}{}isg);

# if none removed, remove unclosed header up to next structural marker
if (!$changed) {
  $changed = ($d =~ s{<header\b[^>]*>.*?(?=(?:<main\b|</main\b|<footer\b|</body\b))}{}is);
}
# last resort: drop from header start to end
$d =~ s{<header\b[^>]*>.*\z}{}is if $d =~ /<header\b/i;

# remove rogue badge/styles
$d =~ s{<!--\s*BADGE_FINAL_UR\s*-->.*?</style>\s*}{}isg;
$d =~ s{<!--\s*UR_BADGE_FINAL\s*-->.*?</style>\s*}{}isg;
$d =~ s{<div\s+id="ur-badge"[^>]*>.*?</div>\s*}{}isg;
$d =~ s{<style\b[^>]*>[\s\S]*?(ur-badge|header::before|header::after)[\s\S]*?</style>\s*}{}isg;

# ensure <body> exists
$d = "<body>\n$d" if $d !~ /<body\b/i;

# inject header right after <body>
$d =~ s{(<body\b[^>]*>)}{$1 . "\n<!-- SITE HEADER (LIVE canonical) -->\n" . $HDR . "\n"}ie;

open my $OUT, '>', $home or die $!;
print {$OUT} $d; close $OUT;
