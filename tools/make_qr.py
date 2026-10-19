"""Regenerates assets/whatsapp-qr.svg. Usage: pip install segno && python3 tools/make_qr.py 9779860308208
Paste the svg contents into the .qrtile span in index.html if you change the number."""
import sys, segno
num = sys.argv[1] if len(sys.argv) > 1 else "9779860308208"
msg = "Hi%20Shuvam%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch."
segno.make(f"https://wa.me/{num}?text={msg}", error="m").save(
    "assets/whatsapp-qr.svg", border=0, scale=1, dark="#04060b", light=None,
    xmldecl=False, svgns=True, nl=False, omitsize=True)
print("saved assets/whatsapp-qr.svg")