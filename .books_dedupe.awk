BEGIN{
  replaced=0
  skipping_section=0
  dropping_orphan_article=0
  depth_article=0
}
function print_new_grid(){
  while ((getline line < ".books_grid.new.html") > 0) print line
  close(".books_grid.new.html")
}
{
  L=$0

  # If we're skipping a later books-grid section, continue until its </section>
  if (skipping_section){
    if (L ~ /<\/section>/) { skipping_section=0 }
    next
  }

  # If we’re dropping a stray article (outside the kept grid), skip until </article>
  if (dropping_orphan_article){
    if (L ~ /<article[^>]*class="[^"]*book-card/){ depth_article++ }
    if (L ~ /<\/article>/){
      depth_article--
      if (depth_article<=0){ dropping_orphan_article=0 }
    }
    next
  }

  # First occurrence of a books-grid: replace with our clean grid and skip original content
  if (!replaced && L ~ /<section[^>]*class="[^"]*books-grid/){
    print_new_grid()
    # Skip original section content until its closing tag
    skipping_section=1
    replaced=1
    next
  }

  # Any additional books-grid sections after the first: drop them
  if (replaced && L ~ /<section[^>]*class="[^"]*books-grid/){
    skipping_section=1
    next
  }

  # If we see a book-card article outside our kept grid, drop it (handles leftovers)
  if (replaced && L ~ /<article[^>]*class="[^"]*book-card/){
    dropping_orphan_article=1
    depth_article=1
    next
  }

  # Otherwise, pass the line through
  print L
}
