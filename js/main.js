// ============================================
// نظام المبيعات المتكامل - BRILLIANT SERVICES
// يدعم: Odoo, Zoho, تطوير المواقع, الهوية البصرية
// ============================================

// سلة المشتريات
let cart = JSON.parse(localStorage.getItem('brilliant_cart')) || [];

// قاعدة بيانات المنتجات
const productsDB = {
    // منتجات Odoo ERP
    'odoo-starter': {
        id: 'odoo-starter',
        name: 'Odoo Starter',
        category: 'odoo',
        basePrice: 3999,
        currency: '$',
        negotiable: true,
        features: ['5 وحدات أساسية', 'دعم فني 3 أشهر', 'تثبيت على سيرفرك']
    },
    'odoo-professional': {
        id: 'odoo-professional',
        name: 'Odoo Professional',
        category: 'odoo',
        basePrice: 7999,
        currency: '$',
        negotiable: true,
        features: ['12 وحدة متكاملة', 'دعم فني 6 أشهر', 'استضافة سحابية']
    },
    'odoo-enterprise': {
        id: 'odoo-enterprise',
        name: 'Odoo Enterprise',
        category: 'odoo',
        basePrice: 14999,
        currency: '$',
        negotiable: true,
        features: ['جميع الوحدات 30+', 'دعم فني غير محدود', 'استضافة مخصصة']
    },
    'odoo-crm': {
        id: 'odoo-crm',
        name: 'وحدة CRM - Odoo',
        category: 'odoo',
        basePrice: 499,
        currency: '$',
        negotiable: false
    },
    'odoo-pos': {
        id: 'odoo-pos',
        name: 'نقطة البيع POS',
        category: 'odoo',
        basePrice: 399,
        currency: '$',
        negotiable: false
    },
    'odoo-inventory': {
        id: 'odoo-inventory',
        name: 'إدارة المخزون',
        category: 'odoo',
        basePrice: 449,
        currency: '$',
        negotiable: false
    },
    'odoo-accounting': {
        id: 'odoo-accounting',
        name: 'المحاسبة',
        category: 'odoo',
        basePrice: 599,
        currency: '$',
        negotiable: false
    },
    
    // منتجات Zoho
    'zoho-one': {
        id: 'zoho-one',
        name: 'Zoho One',
        category: 'zoho',
        basePrice: 37,
        priceType: 'per_user_month',
        currency: '$',
        negotiable: true,
        features: ['40+ تطبيق', 'تكامل كامل', 'دعم فني']
    },
    'zoho-crm': {
        id: 'zoho-crm',
        name: 'Zoho CRM',
        category: 'zoho',
        basePrice: 14,
        priceType: 'per_user_month',
        currency: '$',
        negotiable: false
    },
    'zoho-books': {
        id: 'zoho-books',
        name: 'Zoho Books',
        category: 'zoho',
        basePrice: 9,
        priceType: 'monthly',
        currency: '$',
        negotiable: false
    },
    'zoho-mail': {
        id: 'zoho-mail',
        name: 'Zoho Mail',
        category: 'zoho',
        basePrice: 1,
        priceType: 'per_user_month',
        currency: '$',
        negotiable: false
    },
    'zoho-people': {
        id: 'zoho-people',
        name: 'Zoho People',
        category: 'zoho',
        basePrice: 1.5,
        priceType: 'per_user_month',
        currency: '$',
        negotiable: false
    },
    
    // حزم تطوير المواقع
    'web-basic': {
        id: 'web-basic',
        name: 'حزمة تطوير مواقع - أساسية',
        category: 'web',
        basePrice: 999,
        currency: '$',
        negotiable: true,
        features: ['5 صفحات', 'تصميم متجاوب', 'SEO أساسي']
    },
    'web-business': {
        id: 'web-business',
        name: 'حزمة تطوير مواقع - أعمال',
        category: 'web',
        basePrice: 2499,
        currency: '$',
        negotiable: true,
        features: ['15 صفحة', 'نظام إدارة محتوى', 'متجر إلكتروني']
    },
    'web-enterprise': {
        id: 'web-enterprise',
        name: 'حزمة تطوير مواقع - مؤسسات',
        category: 'web',
        basePrice: 4999,
        currency: '$',
        negotiable: true,
        features: ['صفحات غير محدودة', 'تطبيق موبايل', 'تكامل ERP']
    },
    
    // خدمات الهوية البصرية
    'identity-logo': {
        id: 'identity-logo',
        name: 'تصميم شعار احترافي',
        category: 'identity',
        basePrice: 299,
        currency: '$',
        negotiable: true,
        features: ['3 مقترحات', '3 مراجعات', 'ملفات المصدر']
    },
    'identity-business-card': {
        id: 'identity-business-card',
        name: 'تصميم بطاقات أعمال',
        category: 'identity',
        basePrice: 199,
        currency: '$',
        negotiable: false
    },
    'identity-complete': {
        id: 'identity-complete',
        name: 'باقة الهوية المتكاملة',
        category: 'identity',
        basePrice: 799,
        currency: '$',
        negotiable: true,
        features: ['شعار', 'بطاقات', 'أوراق رسمية', 'دليل إرشادي']
    },
    
    // الخدمات البرمجية الجديدة
    'software-dev': {
        id: 'software-dev',
        name: 'تطوير برمجيات مخصصة',
        category: 'software',
        basePrice: 0,
        currency: '$',
        negotiable: true,
        isCustom: true,
        features: ['برمجيات حسب الطلب', 'تحليل احتياجات', 'تطوير متكامل']
    },
    'webapp-dev': {
        id: 'webapp-dev',
        name: 'تطوير تطبيقات ويب',
        category: 'software',
        basePrice: 0,
        currency: '$',
        negotiable: true,
        isCustom: true
    },
    'mobileapp-dev': {
        id: 'mobileapp-dev',
        name: 'تطوير تطبيقات موبايل',
        category: 'software',
        basePrice: 0,
        currency: '$',
        negotiable: true,
        isCustom: true
    },
    
    // التقنيات الغامرة (Immersive)
    'vr-training': {
        id: 'vr-training',
        name: 'محاكاة التدريب بالواقع الافتراضي VR',
        category: 'immersive',
        basePrice: 0,
        currency: '$',
        negotiable: true,
        isCustom: true,
        features: ['تدريب غامر', 'بيئات تفاعلية', 'تقييم الأداء']
    },
    'digital-twin': {
        id: 'digital-twin',
        name: 'حلول التوأم الرقمي Digital Twin',
        category: 'immersive',
        basePrice: 0,
        currency: '$',
        negotiable: true,
        isCustom: true
    },
    'interactive-3d': {
        id: 'interactive-3d',
        name: 'خطط رئيسية تفاعلية 3D',
        category: 'immersive',
        basePrice: 0,
        currency: '$',
        negotiable: true,
        isCustom: true
    },
    'virtual-tour': {
        id: 'virtual-tour',
        name: 'جولات افتراضية للعقارات',
        category: 'immersive',
        basePrice: 0,
        currency: '$',
        negotiable: true,
        isCustom: true
    },
    'ar-industrial': {
        id: 'ar-industrial',
        name: 'حلول الواقع المعزز الصناعية AR',
        category: 'immersive',
        basePrice: 0,
        currency: '$',
        negotiable: true,
        isCustom: true
    }
};

// حفظ السلة
function saveCart() {
    localStorage.setItem('brilliant_cart', JSON.stringify(cart));
    updateCartCount();
    updateCartSidebar();
}

// تحديث عدد العناصر في السلة
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

// إضافة منتج إلى السلة
function addToCart(productId, customPrice = null, customQuantity = 1, customNote = '') {
    const product = productsDB[productId];
    if (!product) {
        console.error('Product not found:', productId);
        return false;
    }
    
    // التحقق إذا كان المنتج موجود بالفعل في السلة
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += customQuantity;
        if (customPrice) existingItem.customPrice = customPrice;
        if (customNote) existingItem.customNote = customNote;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            basePrice: product.basePrice,
            priceType: product.priceType,
            currency: product.currency,
            negotiable: product.negotiable,
            isCustom: product.isCustom || false,
            quantity: customQuantity,
            customPrice: customPrice || null,
            customNote: customNote || ''
        });
    }
    
    saveCart();
    showNotification(`✅ تم إضافة ${product.name} إلى سلة المشتريات`);
    return true;
}

// إزالة منتج من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showNotification('🗑️ تم إزالة المنتج من السلة');
}

// تحديث كمية منتج
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
        }
    }
}

// تحديث السعر المخصص
function updateCustomPrice(productId, price) {
    const item = cart.find(item => item.id === productId);
    if (item && item.negotiable) {
        item.customPrice = parseFloat(price);
        saveCart();
    }
}

// حساب السعر النهائي لمنتج
function getItemFinalPrice(item) {
    if (item.customPrice) return item.customPrice;
    return item.basePrice;
}

// حساب إجمالي السلة
function getCartTotal() {
    return cart.reduce((total, item) => {
        const price = getItemFinalPrice(item);
        return total + (price * item.quantity);
    }, 0);
}

// عرض السلة الجانبية
function updateCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const negotiableBadge = document.getElementById('negotiableBadge');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>سلة المشتريات فارغة</p>
                <small>أضف منتجات لتبدأ</small>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '0';
        if (negotiableBadge) negotiableBadge.style.display = 'none';
        return;
    }
    
    let html = '';
    let hasNegotiable = false;
    
    cart.forEach(item => {
        const price = getItemFinalPrice(item);
        const totalItemPrice = price * item.quantity;
        if (item.negotiable) hasNegotiable = true;
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    ${item.isCustom ? '<span class="custom-badge">حسب الطلب</span>' : ''}
                    ${item.negotiable ? '<span class="negotiable-badge">قابل للمناقشة</span>' : ''}
                    ${item.customNote ? `<p class="cart-item-note"><i class="fas fa-comment"></i> ${item.customNote}</p>` : ''}
                </div>
                <div class="cart-item-price">
                    ${item.negotiable ? `
                        <div class="price-input-group">
                            <input type="number" class="custom-price-input" value="${price}" step="100" min="0" data-id="${item.id}">
                            <span>${item.currency}</span>
                        </div>
                    ` : `
                        <span class="item-price">${item.currency}${price}</span>
                    `}
                    ${item.priceType ? `<small class="price-type">/${item.priceType === 'per_user_month' ? 'مستخدم/شهر' : (item.priceType === 'monthly' ? 'شهر' : '')}</small>` : ''}
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="qty-btn minus" data-id="${item.id}">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div class="cart-item-total">${item.currency}${totalItemPrice.toFixed(2)}</div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    if (cartTotal) cartTotal.textContent = getCartTotal().toFixed(2);
    if (negotiableBadge) negotiableBadge.style.display = hasNegotiable ? 'inline-flex' : 'none';
    
    // إضافة مستمعي الأحداث للعناصر الجديدة
    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = cart.find(i => i.id === id);
            if (item) updateQuantity(id, item.quantity - 1);
        });
    });
    
    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = cart.find(i => i.id === id);
            if (item) updateQuantity(id, item.quantity + 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(btn.dataset.id);
        });
    });
    
    document.querySelectorAll('.custom-price-input').forEach(input => {
        input.addEventListener('change', () => {
            updateCustomPrice(input.dataset.id, parseFloat(input.value));
        });
    });
}

// فتح/إغلاق السلة الجانبية
function toggleCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar) {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('open');
        updateCartSidebar();
    }
}

// فتح نافذة المناقشة
function openNegotiationModal(productId, productName, currentPrice) {
    const modal = document.getElementById('negotiationModal');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductId = document.getElementById('modalProductId');
    const currentPriceSpan = document.getElementById('currentPriceSpan');
    const suggestedPrice = document.getElementById('suggestedPrice');
    
    if (modal) {
        modalProductName.textContent = productName;
        modalProductId.value = productId;
        currentPriceSpan.textContent = currentPrice;
        suggestedPrice.value = currentPrice;
        modal.style.display = 'flex';
    }
}

// إغلاق نافذة المناقشة
function closeNegotiationModal() {
    const modal = document.getElementById('negotiationModal');
    if (modal) modal.style.display = 'none';
}

// إرسال طلب مناقشة سعر
function sendNegotiationRequest() {
    const productId = document.getElementById('modalProductId')?.value;
    const productName = document.getElementById('modalProductName')?.textContent;
    const suggestedPrice = document.getElementById('suggestedPrice')?.value;
    const message = document.getElementById('negotiationMessage')?.value;
    
    if (!productId) return;
    
    // إضافة المنتج مع السعر المقترح
    addToCart(productId, parseFloat(suggestedPrice), 1, message);
    closeNegotiationModal();
    showNotification(`📝 تم إضافة ${productName} بطلب مناقصة سعرية`);
}

// إظهار الإشعارات
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'cart-notification';
    notif.innerHTML = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// فتح نموذج الطلب النهائي
function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    if (!modal) return;
    
    // عرض عناصر السلة في نموذج الطلب
    let itemsHtml = '';
    cart.forEach(item => {
        const price = getItemFinalPrice(item);
        itemsHtml += `
            <div class="checkout-item">
                <span>${item.name} ${item.quantity > 1 ? `x${item.quantity}` : ''}</span>
                <span>${item.currency}${(price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    if (checkoutItems) checkoutItems.innerHTML = itemsHtml;
    if (checkoutTotal) checkoutTotal.textContent = getCartTotal().toFixed(2);
    
    modal.style.display = 'flex';
}

// إغلاق نموذج الطلب
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.style.display = 'none';
}

// إرسال الطلب النهائي
function submitOrder() {
    const name = document.getElementById('checkoutName')?.value;
    const email = document.getElementById('checkoutEmail')?.value;
    const phone = document.getElementById('checkoutPhone')?.value;
    const company = document.getElementById('checkoutCompany')?.value;
    const notes = document.getElementById('checkoutNotes')?.value;
    
    if (!name || !email) {
        showNotification('الرجاء إدخال الاسم والبريد الإلكتروني');
        return;
    }
    
    // تجهيز بيانات الطلب
    const orderData = {
        customer: { name, email, phone, company },
        notes,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: getItemFinalPrice(item),
            currency: item.currency,
            customNote: item.customNote,
            negotiable: item.negotiable
        })),
        total: getCartTotal(),
        currency: '$',
        date: new Date().toISOString()
    };
    
    // حفظ الطلب محلياً
    const orders = JSON.parse(localStorage.getItem('brilliant_orders') || '[]');
    orders.push({ ...orderData, orderId: 'ORD-' + Date.now(), status: 'pending' });
    localStorage.setItem('brilliant_orders', JSON.stringify(orders));
    
    // عرض رسالة تأكيد
    showNotification(`🎉 شكراً ${name}! تم استلام طلبك وسنقوم بالتواصل خلال 24 ساعة`);
    
    // مسح السلة
    cart = [];
    saveCart();
    closeCheckoutModal();
    toggleCartSidebar();
    
    // فتح صفحة الطلبات
    setTimeout(() => {
        window.location.href = 'orders.html';
    }, 2000);
}

// تحميل سلة المشتريات من localStorage
function loadCart() {
    updateCartCount();
}

// تصدير الدوال للاستخدام العام
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCartSidebar = toggleCartSidebar;
window.openNegotiationModal = openNegotiationModal;
window.closeNegotiationModal = closeNegotiationModal;
window.sendNegotiationRequest = sendNegotiationRequest;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.submitOrder = submitOrder;

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    // إضافة أيقونة السلة لجميع الصفحات
    const cartIconHtml = `
        <div class="cart-icon" onclick="toggleCartSidebar()">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count">0</span>
        </div>
        <div class="cart-overlay" id="cartOverlay" onclick="toggleCartSidebar()"></div>
        <div class="cart-sidebar" id="cartSidebar">
            <div class="cart-header">
                <h3><i class="fas fa-shopping-cart"></i> سلة المشتريات</h3>
                <button class="close-cart" onclick="toggleCartSidebar()"><i class="fas fa-times"></i></button>
            </div>
            <div class="cart-items" id="cartItems">
                <div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>سلة المشتريات فارغة</p></div>
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>الإجمالي:</span>
                    <span>$<span id="cartTotal">0</span></span>
                </div>
                <div class="negotiable-info" id="negotiableBadge" style="display: none;">
                    <i class="fas fa-comment-dollar"></i> بعض المنتجات قابلة للمناقشة
                </div>
                <button class="checkout-btn" onclick="openCheckoutModal()">إتمام الطلب <i class="fas fa-arrow-left"></i></button>
            </div>
        </div>
        
        <!-- نافذة مناقشة السعر -->
        <div class="modal" id="negotiationModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-comment-dollar"></i> مناقشة السعر</h3>
                    <button class="modal-close" onclick="closeNegotiationModal()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <p>المنتج: <strong id="modalProductName"></strong></p>
                    <input type="hidden" id="modalProductId">
                    <div class="form-group">
                        <label>السعر الحالي:</label>
                        <span id="currentPriceSpan" class="current-price"></span>
                    </div>
                    <div class="form-group">
                        <label>السعر المقترح:</label>
                        <input type="number" id="suggestedPrice" class="form-control" step="100" min="0">
                    </div>
                    <div class="form-group">
                        <label>ملاحظات إضافية:</label>
                        <textarea id="negotiationMessage" class="form-control" rows="3" placeholder="اذكر سبب طلب المناقشة أو أي متطلبات خاصة..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-outline" onclick="closeNegotiationModal()">إلغاء</button>
                    <button class="btn-primary" onclick="sendNegotiationRequest()">إرسال طلب مناقشة</button>
                </div>
            </div>
        </div>
        
        <!-- نافذة إتمام الطلب -->
        <div class="modal" id="checkoutModal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h3><i class="fas fa-file-invoice"></i> إتمام الطلب</h3>
                    <button class="modal-close" onclick="closeCheckoutModal()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="checkout-grid">
                        <div class="checkout-form">
                            <h4>معلومات الاتصال</h4>
                            <div class="form-group"><input type="text" id="checkoutName" class="form-control" placeholder="الاسم الكامل *" required></div>
                            <div class="form-group"><input type="email" id="checkoutEmail" class="form-control" placeholder="البريد الإلكتروني *" required></div>
                            <div class="form-group"><input type="tel" id="checkoutPhone" class="form-control" placeholder="رقم الهاتف"></div>
                            <div class="form-group"><input type="text" id="checkoutCompany" class="form-control" placeholder="اسم الشركة"></div>
                            <div class="form-group"><textarea id="checkoutNotes" class="form-control" rows="3" placeholder="ملاحظات إضافية..."></textarea></div>
                        </div>
                        <div class="checkout-summary">
                            <h4>ملخص الطلب</h4>
                            <div class="checkout-items" id="checkoutItems"></div>
                            <div class="checkout-total">
                                <span>الإجمالي:</span>
                                <span>$<span id="checkoutTotal">0</span></span>
                            </div>
                            <p class="checkout-note"><i class="fas fa-info-circle"></i> سيتم التواصل معك لتأكيد الطلب والتفاصيل</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-outline" onclick="closeCheckoutModal()">رجوع</button>
                    <button class="btn-primary" onclick="submitOrder()">تأكيد الطلب <i class="fas fa-check"></i></button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة عناصر واجهة السلة إذا لم تكن موجودة
    if (!document.querySelector('.cart-icon')) {
        document.body.insertAdjacentHTML('beforeend', cartIconHtml);
    }
    
    // إضافة أنماط CSS لنظام المبيعات
    const cartStyles = document.createElement('style');
    cartStyles.textContent = `
        .cart-icon {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 55px;
            height: 55px;
            background: var(--brand-gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.4rem;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            transition: var(--transition);
        }
        .cart-icon:hover { transform: scale(1.1); }
        .cart-count {
            position: absolute;
            top: -8px;
            right: -8px;
            background: var(--accent);
            color: white;
            font-size: 0.65rem;
            font-weight: bold;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
        }
        .cart-sidebar {
            position: fixed;
            top: 0;
            left: -400px;
            width: 400px;
            height: 100vh;
            background: var(--white-pure);
            box-shadow: var(--shadow-lg);
            z-index: 1002;
            transition: left 0.3s ease;
            display: flex;
            flex-direction: column;
            font-family: 'Tajawal', sans-serif;
        }
        .cart-sidebar.open { left: 0; }
        .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1001;
            visibility: hidden;
            opacity: 0;
            transition: var(--transition);
        }
        .cart-overlay.open { visibility: visible; opacity: 1; }
        .cart-header {
            padding: 20px;
            border-bottom: 1px solid var(--gray-light);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .cart-header h3 { margin: 0; color: var(--primary); }
        .close-cart { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--gray); }
        .cart-items { flex: 1; overflow-y: auto; padding: 20px; }
        .cart-item {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 10px;
            padding: 15px 0;
            border-bottom: 1px solid var(--gray-light);
        }
        .cart-item-info h4 { margin: 0 0 5px; font-size: 0.95rem; }
        .negotiable-badge, .custom-badge {
            display: inline-block;
            font-size: 0.65rem;
            padding: 2px 8px;
            border-radius: 20px;
            margin-left: 5px;
        }
        .negotiable-badge { background: #fef3c7; color: #d97706; }
        .custom-badge { background: #dbeafe; color: #2563eb; }
        .cart-item-note {
            font-size: 0.7rem;
            color: var(--gray);
            margin-top: 5px;
        }
        .price-input-group {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .custom-price-input {
            width: 80px;
            padding: 4px 8px;
            border: 1px solid var(--gray-light);
            border-radius: 8px;
        }
        .quantity-control {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .qty-btn {
            width: 28px;
            height: 28px;
            border: 1px solid var(--gray-light);
            background: var(--white-soft);
            border-radius: 8px;
            cursor: pointer;
        }
        .remove-item {
            background: none;
            border: none;
            color: #ef4444;
            cursor: pointer;
            font-size: 1rem;
        }
        .cart-footer {
            padding: 20px;
            border-top: 1px solid var(--gray-light);
        }
        .cart-total {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 10px;
        }
        .negotiable-info {
            font-size: 0.75rem;
            color: #d97706;
            margin-bottom: 15px;
        }
        .checkout-btn {
            width: 100%;
            padding: 12px;
            background: var(--brand-gradient);
            color: white;
            border: none;
            border-radius: 40px;
            font-weight: bold;
            cursor: pointer;
        }
        .empty-cart {
            text-align: center;
            padding: 40px;
            color: var(--gray);
        }
        .empty-cart i { font-size: 3rem; margin-bottom: 10px; display: block; }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1100;
            align-items: center;
            justify-content: center;
        }
        .modal-content {
            background: var(--white-pure);
            border-radius: var(--border-radius);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal-large { max-width: 800px; }
        .modal-header {
            padding: 20px;
            border-bottom: 1px solid var(--gray-light);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-body { padding: 20px; }
        .modal-footer {
            padding: 20px;
            border-top: 1px solid var(--gray-light);
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        .checkout-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .checkout-items {
            margin: 15px 0;
        }
        .checkout-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dashed var(--gray-light);
        }
        .checkout-total {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 1.1rem;
            padding-top: 15px;
            border-top: 2px solid var(--gray-light);
            margin-top: 15px;
        }
        .checkout-note {
            font-size: 0.7rem;
            color: var(--gray);
            margin-top: 15px;
        }
        .cart-notification {
            position: fixed;
            bottom: 100px;
            left: 100px;
            background: var(--white-pure);
            border-right: 4px solid var(--primary);
            padding: 12px 20px;
            border-radius: 12px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(-120%);
            transition: transform 0.3s;
        }
        .cart-notification.show { transform: translateX(0); }
        @media (max-width: 768px) {
            .cart-sidebar { width: 100%; left: -100%; }
            .checkout-grid { grid-template-columns: 1fr; }
            .cart-notification { left: 20px; right: 20px; bottom: 100px; text-align: center; }
        }
    `;
    document.head.appendChild(cartStyles);
});