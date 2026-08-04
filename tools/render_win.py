# -*- coding: utf-8 -*-
import os, subprocess, sys
from pathlib import Path

SOFFICE = r"C:\Program Files\LibreOffice\program\soffice.exe"

def render(docx_path, out_dir, dpi=110):
    docx_path = Path(docx_path)
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    profile = r"C:\lo_render_profile"
    os.makedirs(profile, exist_ok=True)
    uri = "file:///" + profile.replace("\\", "/")
    cmd = [SOFFICE, "-env:UserInstallation=" + uri, "--invisible", "--headless",
           "--norestore", "--convert-to", "pdf", "--outdir", str(out_dir), str(docx_path)]
    p = subprocess.run(cmd, capture_output=True, text=True)
    pdf = out_dir / (docx_path.stem + ".pdf")
    if not pdf.exists() or pdf.stat().st_size == 0:
        print("PDF conversion failed:", p.returncode, p.stdout[-500:], p.stderr[-500:])
        sys.exit(1)
    import pypdfium2 as pdfium
    doc = pdfium.PdfDocument(str(pdf))
    scale = dpi / 72.0
    for i, page in enumerate(doc):
        img = page.render(scale=scale).to_pil()
        out = out_dir / ("page-%d.png" % (i+1))
        img.save(out)
        print("saved", out)
    print("pages:", len(doc))

if __name__ == "__main__":
    render(sys.argv[1], sys.argv[2])
