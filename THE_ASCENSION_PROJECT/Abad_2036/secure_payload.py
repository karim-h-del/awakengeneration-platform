import os
import json
from secrets import token_bytes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

def encrypt_lecture(input_file_path, output_encrypted_path, shared_key_hex):
    """
    تشفير ملف المحاضرة بالكامل باستخدام AES-GCM 256-bit لحماية الوعي المعرفي
    """
    # تحويل المفتاح السري المشترك من صيغة الهكس إلى بايتات
    key = bytes.fromhex(shared_key_hex)
    aesgcm = AESGCM(key)
    
    # توليد رقم عشوائي فريد لعملية التشفير (Nonce) لمنع الهجمات التكرارية
    nonce = os.urandom(12)
    
    # قراءة مادة المحاضرة الجافة (فيديو أو نص)
    with open(input_file_path, 'rb') as f:
        file_data = f.read()
    
    # تشفير البيانات وحقنها برقم النونص لحماية سلامة الملف
    encrypted_data = aesgcm.encrypt(nonce, file_data, None)
    
    # حفظ الملف المشفر النهائي مع النونص في البداية
    with open(output_encrypted_path, 'wb') as f:
        f.write(nonce + encrypted_data)
        
    print(f"[+] تم التشفير بنجاح. الملف الجاهز للرفع اللامركزي: {output_encrypted_path}")

# مثال تشغيلي للاستخدام داخل الشبكة الافتراضية
if __name__ == "__main__":
    # هذا المفتاح المشترك يتم تداوله بشكل سري وآمن بين جيل اليقظة فقط
    # لغرض الاختبار، نولد مفتاحاً عشوائياً بـ 256 بت
    MY_SECRET_KEY = AESGCM.generate_key(bit_length=256).hex()
    
    # تحديد مسار المحاضرة الأولى (نص المفهوم والسنن الفيزيائية)
    input_lecture = "lecture_01_mashi'ah.md"
    output_secure = "lecture_01_secured.enc"
    
    # إنشاء ملف وهمي للاختبار إذا لم يكن موجوداً
    if not os.path.exists(input_lecture):
        with open(input_lecture, "w", encoding="utf-8") as f:
            f.write("# المحور الأول: فيزياء المشيئة الحرة وسقوط خوارزميات الاستعباد")
            
    encrypt_lecture(input_lecture, output_secure, MY_SECRET_KEY)
    print(f"[-] المفتاح المشترك لفك التشفير (تداوله عبر قنوات مشفرة فقط): {MY_SECRET_KEY}")