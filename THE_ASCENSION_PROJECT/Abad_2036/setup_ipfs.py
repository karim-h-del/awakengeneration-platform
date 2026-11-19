import urllib.request
import zipfile
import os
import shutil

url = "https://ipfs.tech"
zip_name = "kubo_v0.32.1_windows-amd64.zip"

print("[+] جاري تحميل حزمة IPFS الفعلية (حوالي 45 ميجابايت)، يرجى الانتظار...")
urllib.request.urlretrieve(url, zip_name)

print("[+] جاري فك ضغط الحزمة...")
with zipfile.ZipFile(zip_name, 'r') as zip_ref:
    zip_ref.extractall(".")

print("[+] نقل الأداة السيادية ipfs.exe وتنظيف المجلد...")
if os.path.exists("kubo/ipfs.exe"):
    shutil.move("kubo/ipfs.exe", "./ipfs.exe")

# تنظيف المجلدات المؤقتة
if os.path.exists("kubo"):
    shutil.rmtree("kubo")
if os.path.exists(zip_name):
    os.remove(zip_name)
if os.path.exists("setup_ipfs.py"):
    os.remove("setup_ipfs.py")

print("[+] اكتمل الإعداد بنجاح تام! أداة ipfs.exe جاهزة للعمل الآن.")
