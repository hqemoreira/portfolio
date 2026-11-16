# CV source

Editable source for the public CV download.

- Edit [`Henrique_Moreira_CV.html`](Henrique_Moreira_CV.html)
- Regenerate PDF (Chrome headless), then copy to `public/Henrique_Moreira_CV.pdf` and Desktop if needed:

```powershell
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$html = (Resolve-Path '.\cv\Henrique_Moreira_CV.html').Path
$pdf = (Resolve-Path '.\cv').Path + '\Henrique_Moreira_CV.pdf'
& $chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$pdf" ("file:///" + $html.Replace('\','/'))
Copy-Item $pdf .\public\Henrique_Moreira_CV.pdf -Force
```

Positioning must match the portfolio: **18 years industrial B2B first**, applied AI as evolution — not an AI-consultant-first CV.
