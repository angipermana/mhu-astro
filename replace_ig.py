import re

with open('/home/angi/project/mhu-astro/src/pages/index.astro', 'r') as f:
    content = f.read()

# The user wants to replace the Mock Instagram Grid with official Instagram blockquotes.
# The URLs provided are:
# https://www.instagram.com/p/DXWk221DGmj/
# https://www.instagram.com/p/DXacGZsjP4F/
# https://www.instagram.com/p/DXFLmJgDFD0/

replacement = """			<!-- Instagram Embed Grid -->
			<div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
				<div class="w-full max-w-[400px]">
					<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DXWk221DGmj/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>
				</div>
				<div class="w-full max-w-[400px]">
					<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DXacGZsjP4F/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>
				</div>
				<div class="w-full max-w-[400px]">
					<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DXFLmJgDFD0/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>
				</div>
			</div>
			
			<script async src="//www.instagram.com/embed.js"></script>"""

# Find the start and end of the mock grid
start_str = "<!-- Mock Instagram Grid -->"
end_str = "</div>\n\t\t\t\n\t\t\t<div class=\"text-center mt-12\">"

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + replacement + "\n\t\t\t\n\t\t\t<div class=\"text-center mt-12\">" + content[end_idx + len(end_str):]
    with open('/home/angi/project/mhu-astro/src/pages/index.astro', 'w') as f:
        f.write(new_content)
    print("Replaced successfully")
else:
    print("Could not find start or end strings")
    if start_idx == -1: print("Start string not found")
    if end_idx == -1: print("End string not found")

