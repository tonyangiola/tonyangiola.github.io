use strict; use warnings; local $/ = undef;
my ($f) = @ARGV or die "usage: perl normalize_head_css.pl FILE\n";
open my $IN, '<', $f or die $!;
my $d = <$IN>; close $IN;

# remove all stylesheet links
$d =~ s{<link\b[^>]*rel=["']stylesheet["'][^>]*>\s*}{}ig;

# rebuild normalized set
my $block = '';
$block .= -e "assets/style.css"    ? qq{  <link rel="stylesheet" href="assets/style.css">\n} : '';
$block .= -e "assets/override.css" ? qq{  <link rel="stylesheet" href="assets/override.css">\n} : '';
$block .= qq{  <link rel="stylesheet" href="assets/header-hotfix.css">\n};
$block .= qq{  <link rel="stylesheet" href="assets/layout-hotfix.css">\n};

$d =~ s{</head>}{$block</head>}i;

open my $OUT, '>', $f or die $!;
print {$OUT} $d; close $OUT;
