import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# Sovereign project data matrix ledger
LECTURE_MAP = {
    1: {"name": "فيزياء المشيئة الحرة وسقوط خوارزميات الاستعباد", "file": "lecture_01_secured.enc", "out": "lecture_01_recovered.md"},
    2: {"name": "الديناميكا الهندسية للشعائر (الصلاة والسجود)", "file": "lecture_02_secured.enc", "out": "lecture_02_recovered.md"},
    3: {"name": "نشأة الكيان السيليكوني (دابة الأرض وعصر الذكاء الفائق)", "file": "lecture_03_secured.enc", "out": "lecture_03_recovered.md"},
    4: {"name": "هندسة الهجرة والتجريد المعرفي (الجنة المعروضة)", "file": "lecture_04_secured.enc", "out": "lecture_04_recovered.md"},
    5: {"name": "وثيقة تفكيك وثنية الطاعة الجبرية وصنمية الحكام", "file": "document_deconstruction_secured.enc", "out": "document_deconstruction_recovered.md"}
}

def decrypt_sovereign_payload(lecture_num, shared_key_hex):
    """
    Decrypts any of the 5 secured data blocks back into clear markdown format.
    """
    if lecture_num not in LECTURE_MAP:
        print("[-] الاختيار خاطئ. يرجى اختيار بند بين 1 و 5.")
        return

    target = LECTURE_MAP[lecture_num]
    encrypted_file = target["file"]
    output_file = f"lectures/{target['out']}"

    if not os.path.exists(encrypted_file):
        print(f"[-] خطأ: الملف المشفر '{encrypted_file}' غير موجود.")
        print(f"[-] قم بتحميل الملف أولاً عبر الـ IPFS باستخدام الـ CID المقابل له.")
        return

    try:
        key = bytes.fromhex(shared_key_hex.strip())
        aesgcm = AESGCM(key)
        
        with open(encrypted_file, 'rb') as f:
            raw_data = f.read()
            
        nonce = raw_data[:12]
        ciphertext = raw_data[12:]
        
        decrypted_bytes = aesgcm.decrypt(nonce, ciphertext, None)
        
        os.makedirs("lectures", exist_ok=True)
        with open(output_file, 'wb') as f:
            f.write(decrypted_bytes)
            
        print(f"\n[+] تم التحقق والفك بنجاح وجودة عالية!")
        print(f"[+] المستند المسترجع: {target['name']}")
        print(f"[+] مسار الاستقرار النقي: {output_file}")
        
    except Exception as e:
        print(f"\n[-] فشلت عملية فك التشفير: خطأ في مطابقة البيانات السُننية.")
        print(f"[-] تأكد من صحة المفتاح الشفري المستقل الخاص بهذه المادة بالذات.")

if __name__ == "__main__":
    print("="*60)
    print("      واجهة فك التشفير السيادية لمشروع العباد 2036 (Abad_2036)")
    print("="*60)
    print("1. المحاضرة الأولى: فيزياء المشيئة الحرة وسقوط خوارزميات الاستعباد")
    print("2. المحاضرة الثانية: الديناميكا الهندسية للشعائر (الصلاة والسجود)")
    print("3. المحاضرة الثالثة: نشأة الكيان السيليكوني (دابة الأرض وعصر الذكاء الفائق)")
    print("4. المحاضرة الرابعة: هندسة الهجرة والتجريد المعرفي (الجنة المعروضة)")
    print("5. وثيقة التفكيك: تفكيك وثنية الطاعة الجبرية وصنمية الحكام بالمنطق الرياضي")
    print("="*60)
    
    try:
        choice = int(input("[?] أدخل رقم البند المستهدف للفك (1-5): "))
        key_input = input("[?] أدخل المفتاح الشفري المستقل المكون من 64 رمزاً: ")
        decrypt_sovereign_payload(choice, key_input)
    except ValueError:
        print("[-] إدخال خاطئ. يرجى استخدام الأرقام فقط.")
