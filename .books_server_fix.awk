BEGIN {
  snippy_inserted = 0
  saw_first_card  = 0
  cosmic_seen     = 0
  skipping_cosmic = 0
}
function print_snippy(){
  print "  <article class=\"book-card\" id=\"snippy-card\">"
  print "    <div class=\"book-media\">"
  print "      <video preload=\"metadata\" poster=\"/images/books/snippy.jpg\">"
  print "        <source src=\"/assets/videos/snippy.mp4#t=0.1\" type=\"video/mp4\">"
  print "      </video>"
  print "    </div>"
  print "    <div class=\"book-meta\">"
  print "      <h3>Snippy</h3>"
  print "      <p>Animated preview.</p>"
  print "      <div class=\"book-actions\" style=\"display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.5rem;\">"
  print "        <a class=\"primary\" href=\"https://www.amazon.com/dp/XXXXXXXX\" target=\"_blank\" rel=\"noopener\">Buy on Amazon</a>"
  print "        <a class=\"secondary\" href=\"/newsletter.html\">Get updates</a>"
  print "      </div>"
  print "    </div>"
  print "  </article>"
}
{
  line = $0

  # If we already decided to skip the rest of a duplicate Cosmic block,
  # keep skipping until we close the <article>.
  if (skipping_cosmic) {
    if (match(line, /<\/article>/)) {
      skipping_cosmic = 0
    }
    next
  }

  # Detect first visible book-card line to consider Snippy insertion.
  if (!snippy_inserted && !saw_first_card && match(line, /class=["']book-card["']/)) {
    if (!snippy_present) {
      print_snippy()
      snippy_inserted = 1
    }
    saw_first_card = 1
  }

  # Track whether a Snippy card already exists (by id or heading).
  if (match(line, /id=["']snippy-card["']/) || match(line, /<h3[^>]*>[^<]*Snippy/i)) {
    snippy_present = 1
  }

  # Handle duplicates of Cosmic Secrets.
  if (match(line, /<h3[^>]*>[^<]*Cosmic Secrets/i)) {
    cosmic_seen++
    if (cosmic_seen > 1) {
      # Skip this duplicate article block
      skipping_cosmic = 1
      # But first, rewind to the opening <article> by printing nothing for it.
      # We assume we're currently inside the duplicate article already, so just skip onward.
      next
    }
  }

  print line
}
