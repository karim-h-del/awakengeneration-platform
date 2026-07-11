/**
 * محرك التشفير السيادي - منصة الجيل المستنير
 * يعتمد على خوارزمية AES-GCM الموصى بها فيزيائياً لحماية البيانات الكمية
 */

// 1. دالة لتوليد مفتاح تشفير مشتق من كلمة مرور المستخدم (PBKDF2)
async function deriveKey(password) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    // استخدام ملح ثابت (Salt) لتأصيل التشفير في المعالج المحلي
    const salt = encoder.encode('AwakenedGenerationSalt2026'); 

    const baseKey = await crypto.subtle.importKey(
        'raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000, // عدد دورات التجزئة لتعجيز خوادم الاختراق
            hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 }, // تشفير 256 بت صارم
        false,
        ['encrypt', 'decrypt']
    );
}

// 2. بروتوكول التشفير المباشر (Encryption Protocol)
async function encryptData(plainText, password) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(plainText);
    const key = await deriveKey(password);
    
    // توليد متجه تهيئة عشوائي (IV) فريد لكل عملية تشفير لضمان عدم تكرار النمط
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        dataBuffer
    );

    // دمج المتجه (IV) مع البيانات المشفرة وتحويلها إلى نص قابل للتخزين (Base64)
    const combinedArray = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combinedArray.set(iv);
    combinedArray.set(new Uint8Array(encryptedBuffer), iv.length);
    
    return btoa(String.fromCharCode.apply(null, combinedArray));
}

// 3. بروتوكول فك التشفير واستدعاء البيانات (Decryption Protocol)
async function decryptData(cipherTextBase64, password) {
    try {
        const key = await deriveKey(password);
        const combinedArray = new Uint8Array(atob(cipherTextBase64).split('').map(c => c.charCodeAt(0)));
        
        // استخراج متجه التهيئة (IV) والبيانات المشفرة الأصيلة
        const iv = combinedArray.slice(0, 12);
        const encryptedData = combinedArray.slice(12);

        const decryptedBuffer = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            encryptedData
        );

        const decoder = new TextDecoder();
        return decoder.decode(decryptedBuffer);
    } catch (error) {
        throw new Error('❌ كلمة المرور غير مطابقة لكود التشفير الكوني أو تم التلاعب بالبيانات.');
    }
}
// دالة اختبارية لتشغيل الحفظ المشفر التفاعلي عبر الواجهة
async function triggerSecureSave() {
    const passwordInput = document.getElementById('cyber-password').value;
    const statusBox = document.getElementById('crypto-status');
    
    if (!passwordInput) {
        statusBox.className = "status-box status-error";
        statusBox.innerText = "❌ خطأ برمي: لا يمكن تشغيل البروتوكول بدون إدخال مفتاح سري لتأصيل التشفير.";
        return;
    }

    // محاكاة لحزمة بيانات مسار التعلم الخاص بالمستخدم (يمكنك ربطها ببيانات موقعك الحقيقية لاحقاً)
    const currentProgressData = {
        station: 75,
        timestamp: Date.now(),
        status: "Ascended",
        neural_nodes_active: true
    };

    statusBox.className = "status-box";
    statusBox.innerText = "⏳ جاري معالجة الكود وتأمين البيانات كمياً...";

    try {
        // استدعاء دالة التشفير والحفظ التي صممناها سابقاً
        await secureSaveProgress(passwordInput, currentProgressData);
        statusBox.className = "status-box status-success";
        statusBox.innerText = "🔒 تم تشفير البيانات بنجاح 100%، وحفظها كأكواد صماء داخل النود المحلي لجهازك.";
    } catch (error) {
        statusBox.className = "status-box status-error";
        statusBox.innerText = "❌ فشل النظام: تعذر إتمام التشفير الحيوي.";
    }
}

// دالة تفاعلية لاستدعاء وفك البيانات من الـ localStorage
async function triggerSecureLoad() {
    const passwordInput = document.getElementById('cyber-password').value;
    const statusBox = document.getElementById('crypto-status');
    
    if (!passwordInput) {
        statusBox.className = "status-box status-error";
        statusBox.innerText = "❌ خطأ برمي: أدخل مفتاحك السري أولاً ليتمكن المعالج من فك التشفير عن حزمة البيانات المخلدة.";
        return;
    }

    statusBox.className = "status-box";
    statusBox.innerText = "⏳ جاري فحص مطابقة المفتاح للمصفوفة الكونية التجريدية...";

    // استدعاء دالة استعادة البيانات وفك تشفيرها
    const decryptedData = await secureLoadProgress(passwordInput);
    
    if (decryptedData) {
        statusBox.className = "status-box status-success";
        statusBox.innerText = `🔓 تم التحقق بنجاح! تم استدعاء حزمة الوعي (المحطة: ${decryptedData.station} // النمط: ${decryptedData.status}).`;
        console.log("البيانات المسترجعة بنجاح:", decryptedData);
    } else {
        // دالة secureLoadProgress ستتعامل مع الخطأ وتعرض التنبيه في حالة كانت كلمة المرور خاطئة
        statusBox.className = "status-box status-error";
        statusBox.innerText = "❌ فشل فك التشفير: المفتاح المدخل غير متوافق مع خوارزمية التشفير الأصلية.";
    }
}