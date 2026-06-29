/**
 * THE Y APP — Pitch para Museos
 * ─────────────────────────────
 * Instrucciones:
 *  1. Ve a script.google.com → Nuevo proyecto
 *  2. Borra el código que hay y pega TODO este archivo
 *  3. Pulsa el botón ▶ Run (o Ctrl+R)
 *  4. La primera vez pedirá permisos → Acepta
 *  5. Abre Google Drive → encontrarás "The Y App · Pitch para Museos"
 */

function crearPitch() {
  const pres = SlidesApp.create('The Y App · Pitch para Museos');
  pres.getSlides()[0].remove(); // eliminar slide vacío inicial

  const W = 720, H = 405; // dimensiones estándar 16:9
  const PL = 64;           // padding izquierdo
  const CW = W - PL - 48; // ancho de contenido

  // ─── Helpers ────────────────────────────────────────────────

  function newSlide(hexBg) {
    const s = pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    if (hexBg) s.getBackground().setSolidFill(hexBg);
    return s;
  }

  function box(slide, str, l, t, w, h, size, hexColor, bold, italic) {
    const tb = slide.insertTextBox(str, l, t, w, h);
    tb.getFill().setTransparent();
    tb.getBorder().setTransparent();
    tb.setContentAlignment(SlidesApp.ContentAlignment.TOP);
    const ts = tb.getText().getTextStyle();
    ts.setFontSize(size || 14);
    ts.setForegroundColor(hexColor || '#1C1A18');
    ts.setFontFamily('Arial');
    if (bold)   ts.setBold(true);
    if (italic) ts.setItalic(true);
    return tb;
  }

  function label(s, str, top) {
    box(s, str.toUpperCase(), PL, top, CW, 18, 10, '#999999', true);
  }

  function h1(s, str, top, color) {
    box(s, str, PL, top, CW, 130, 42, color || '#1C1A18', true);
  }

  function h2(s, str, top, color) {
    box(s, str, PL, top, CW, 90, 28, color || '#1C1A18', true);
  }

  function body(s, str, top, color) {
    box(s, str, PL, top, CW, 100, 13, color || '#555555');
  }

  function pill(s, icon, title, desc, top) {
    // fondo gris
    const bg = s.insertShape(SlidesApp.ShapeType.ROUNDED_RECTANGLE, PL, top, CW, 44);
    bg.getFill().setSolidFill('#F7F7F7');
    bg.getBorder().setTransparent();
    // icono + texto
    box(s, icon,  PL + 12, top + 10, 28, 28, 18, '#1C1A18');
    box(s, title, PL + 50, top + 6,  200, 16, 12, '#1C1A18', true);
    box(s, desc,  PL + 50, top + 22, CW - 70, 16, 10, '#888888');
  }

  function card(s, icon, title, desc, left, top, w) {
    const bg = s.insertShape(SlidesApp.ShapeType.ROUNDED_RECTANGLE, left, top, w, 110);
    bg.getFill().setSolidFill('#FFFFFF');
    bg.getBorder().setDashStyle(SlidesApp.DashStyle.SOLID);
    bg.getBorder().getLineFill().setSolidFill('#E8E8E8');
    box(s, icon,  left + 14, top + 14, 30, 28, 20, '#1C1A18');
    box(s, title, left + 14, top + 46, w - 28, 20, 12, '#1C1A18', true);
    box(s, desc,  left + 14, top + 66, w - 28, 40, 10, '#777777');
  }

  // ─── SLIDE 1: Cover ─────────────────────────────────────────
  const s1 = newSlide('#1C1A18');
  label(s1, 'Propuesta de colaboración · 2026', 36);
  h1(s1, 'The Y App', 70, '#FFFFFF');
  body(s1, 'La guía de arte con IA que tus visitantes llevan en el bolsillo.', 200, '#AAAAAA');

  // ─── SLIDE 2: El Problema ───────────────────────────────────
  const s2 = newSlide('#FFFFFF');
  label(s2, 'El problema', 36);
  h1(s2, 'El 70% de los visitantes sale sin entender lo que ha visto.', 62);
  body(s2, 'Los carteles son breves. Las audioguías, caras y lentas. La mayoría\nde la gente mira las obras en silencio y sigue andando.\n\nSe pierden la historia, la técnica, el contexto — y contigo se pierde\nuna oportunidad de conexión real con el visitante.', 195, '#555555');
  // quote
  const qLine = s2.insertLine(SlidesApp.LineCategory.STRAIGHT, 440, 195, 440, 285);
  qLine.getLineFill().setSolidFill('#E67E22');
  qLine.setWeight(3);
  box(s2, '"Fui al Prado, era precioso,\npero no entendí casi nada."', 456, 200, 210, 56, 12, '#444444', false, true);
  box(s2, 'Visitante tipo · encuesta post-visita', 456, 258, 210, 20, 9, '#999999');

  // ─── SLIDE 3: La Solución ───────────────────────────────────
  const s3 = newSlide('#FFFFFF');
  label(s3, 'La solución', 36);
  h2(s3, 'Una guía inteligente.\nInstantánea. Personalizada.', 62);
  body(s3, 'El visitante busca una obra o escanea el QR del cartel.\nEn segundos recibe 15 datos precisos explicados a su nivel\n— niño, curioso o experto — sin app de pago ni audioguía.', 175, '#555555');
  // Phone mockup (simplified)
  const phone = s3.insertShape(SlidesApp.ShapeType.ROUNDED_RECTANGLE, 520, 50, 145, 320);
  phone.getFill().setSolidFill('#1C1A18');
  phone.getBorder().setTransparent();
  const screen = s3.insertShape(SlidesApp.ShapeType.ROUNDED_RECTANGLE, 530, 68, 125, 280);
  screen.getFill().setSolidFill('#FFFFFF');
  screen.getBorder().setTransparent();
  box(s3, 'Las Meninas', 538, 80, 110, 18, 9, '#1C1A18', true);
  ['Velázquez pintó Las Meninas en 1656...', 'La obra muestra al artista en...', 'Felipe IV encargó la pintura...', 'Está en el Museo del Prado...', 'Es considerada una de las...'].forEach((t, i) => {
    const c = s3.insertShape(SlidesApp.ShapeType.ROUNDED_RECTANGLE, 538, 104 + i * 42, 110, 34);
    c.getFill().setSolidFill('#F7F7F7');
    c.getBorder().setTransparent();
    box(s3, t, 542, 108 + i * 42, 102, 28, 7, '#555555');
  });

  // ─── SLIDE 4: Cómo funciona ─────────────────────────────────
  const s4 = newSlide('#FFFFFF');
  label(s4, 'Cómo funciona', 36);
  h2(s4, 'Tres pasos. Cero fricción.', 62);
  pill(s4, '🔍', 'Busca o escanea', 'El visitante escribe el nombre de la obra o escanea el QR del cartel', 125);
  pill(s4, '✨', 'IA explica al instante', 'Claude (Anthropic) genera 15 datos precisos adaptados al nivel elegido', 180);
  pill(s4, '🏛️', 'Ve la página de tu museo', 'Si la obra está en vuestra colección, aparece un enlace directo a vuestra página', 235);
  pill(s4, '💾', 'El visitante guarda favoritos', 'Crea su propia colección de obras y vuelve a consultarlas', 290);

  // ─── SLIDE 5: Tres Niveles ──────────────────────────────────
  const s5 = newSlide('#FFFFFF');
  label(s5, 'Personalización', 36);
  h2(s5, 'La misma obra. Tres audiencias.', 62);
  const cw3 = (CW - 24) / 3;
  card(s5, '🧒', 'Para Niños', 'Lenguaje sencillo para 8-12 años. El arte como aventura.', PL, 130, cw3);
  card(s5, '👤', 'Amateur', 'Contexto histórico y movimientos artísticos para el curioso.', PL + cw3 + 12, 130, cw3);
  card(s5, '🎓', 'Profesional', 'Terminología técnica y análisis profundo para expertos.', PL + (cw3 + 12) * 2, 130, cw3);
  box(s5, 'Disponible en Español e Inglés. Más idiomas próximamente.', PL, 350, CW, 20, 10, '#999999');

  // ─── SLIDE 6: Página del Museo ──────────────────────────────
  const s6 = newSlide('#FFFFFF');
  label(s6, 'Tu espacio en la app', 36);
  h2(s6, 'Tu museo tiene su propia página dentro de la app.', 62);
  [
    ['📍', 'Nombre, ciudad y descripción del museo'],
    ['🔗', 'Link directo a tu sitio web oficial'],
    ['🖼️', 'Tu colección curada de obras, tappables'],
    ['📊', 'Datos de qué obras buscan tus visitantes'],
  ].forEach(([icon, text], i) => {
    pill(s6, icon, text, 'Aparece cuando alguien busca una obra de vuestra colección', 155 + i * 52);
  });

  // ─── SLIDE 7: Analytics ─────────────────────────────────────
  const s7 = newSlide('#FFFFFF');
  label(s7, 'Para el museo', 36);
  h2(s7, 'Datos reales de tus visitantes.', 62);
  // 3 stat boxes
  [
    ['Top 10', 'Obras más buscadas este mes'],
    ['ES / EN', 'Distribución por idioma'],
    ['Nivel', '% niños / amateur / experto'],
  ].forEach(([num, lbl], i) => {
    const bx = s7.insertShape(SlidesApp.ShapeType.ROUNDED_RECTANGLE, PL + i * 208, 135, 192, 90);
    bx.getFill().setSolidFill('#F7F7F7');
    bx.getBorder().setTransparent();
    box(s7, num, PL + i * 208 + 14, 148, 165, 38, 26, i === 1 ? '#1C1A18' : '#E67E22', true);
    box(s7, lbl, PL + i * 208 + 14, 190, 165, 24, 10, '#888888');
  });
  // highlight box
  const hBox = s7.insertShape(SlidesApp.ShapeType.ROUNDED_RECTANGLE, PL, 248, CW, 110);
  hBox.getFill().setSolidFill('#1C1A18');
  hBox.getBorder().setTransparent();
  box(s7, 'Inteligencia que no tenías antes', PL + 20, 262, CW - 40, 24, 14, '#FFFFFF', true);
  box(s7, 'Cada búsqueda queda registrada: qué obra, a qué hora, en qué idioma,\na qué nivel de profundidad. Tú ves los datos; el visitante permanece anónimo.', PL + 20, 290, CW - 40, 60, 11, '#AAAAAA');

  // ─── SLIDE 8: Piloto ────────────────────────────────────────
  const s8 = newSlide('#FFFFFF');
  label(s8, 'Propuesta', 36);
  h2(s8, 'Piloto sin riesgo.', 62);
  [
    ['✅', 'Página oficial en la app', 'Creada y mantenida por nosotros con la info que nos facilites'],
    ['✅', 'Colección curada de obras', 'Tus obras enlazadas directamente para tus visitantes'],
    ['✅', 'Informe mensual de datos', 'Comportamiento real de visita basado en búsquedas'],
    ['✅', 'QR listos para imprimir', 'Para colocar junto a vuestras obras o en recepción'],
  ].forEach(([icon, title, desc], i) => {
    pill(s8, icon, title, desc, 130 + i * 52);
  });
  // Price box
  const pBox = s8.insertShape(SlidesApp.ShapeType.ROUNDED_RECTANGLE, 500, 130, 168, 140);
  pBox.getFill().setSolidFill('#F7F7F7');
  pBox.getBorder().setTransparent();
  box(s8, 'TARIFA PILOTO', 514, 144, 140, 16, 8, '#999999', true);
  box(s8, '€0', 514, 162, 140, 60, 52, '#1C1A18', true);
  box(s8, 'Durante los primeros\n3 meses. Solo nos das\nfeedback.', 514, 220, 140, 44, 9, '#888888');

  // ─── SLIDE 9: Cierre ────────────────────────────────────────
  const s9 = newSlide('#E67E22');
  label(s9, 'Siguiente paso', 36);
  h1(s9, '¿Empezamos\nla semana\nque viene?', 70, '#FFFFFF');
  body(s9, 'Solo necesitamos 30 minutos de llamada\ny la lista de obras que quieres incluir.', 290, 'rgba(255,255,255,0.85)');
  // CTA button
  const ctaBg = s9.insertShape(SlidesApp.ShapeType.ROUNDED_RECTANGLE, 420, 280, 240, 52);
  ctaBg.getFill().setSolidFill('#FFFFFF');
  ctaBg.getBorder().setTransparent();
  const ctaTxt = s9.insertTextBox('Contáctanos →', 420, 280, 240, 52);
  ctaTxt.getFill().setTransparent();
  ctaTxt.getBorder().setTransparent();
  ctaTxt.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
  const cts = ctaTxt.getText().getTextStyle();
  cts.setFontSize(14);
  cts.setForegroundColor('#E67E22');
  cts.setBold(true);
  cts.setFontFamily('Arial');
  ctaTxt.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);

  // ─── Numeración de slides ───────────────────────────────────
  pres.getSlides().forEach((s, i) => {
    if (i === 0) return; // no número en la portada
    const n = s.insertTextBox(`${i + 1} / ${pres.getSlides().length}`, W - 60, H - 22, 48, 16);
    n.getFill().setTransparent();
    n.getBorder().setTransparent();
    const ns = n.getText().getTextStyle();
    ns.setFontSize(8);
    ns.setForegroundColor('#CCCCCC');
    n.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.END);
  });

  Logger.log('✅ Presentación creada: ' + pres.getUrl());
  return pres.getUrl();
}
