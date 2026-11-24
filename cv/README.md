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

Positioning must match the portfolio. Primary identity: **International B2B Sales & Commercial Management**. Supporting line: applied AI and digital capabilities for commercial processes and business transformation. Do not restore an AI-consultant CV or imply consultancy services. Selling-price growth of 2.97% in Portugal stays on the CV and off the homepage results cards.
