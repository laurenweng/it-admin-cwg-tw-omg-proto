/**
 * ColorPalette - 系統顏色規範展示元件
 * 根據 Guidelines.md 中定義的設計系統顏色
 */

export function ColorPalette() {
  // 定義顏色分類
  const colorCategories = [
    {
      title: 'Neutral（中性色）',
      colors: [
        { name: 'Black', value: '#1c1c1c', textColor: 'white' },
        { name: 'Grey 900', value: '#555555', textColor: 'white' },
        { name: 'Grey 800', value: '#7c808c', textColor: 'white' },
        { name: 'Grey 700', value: '#a8a9ad', textColor: 'black' },
        { name: 'Grey 600', value: '#c4c9d3', textColor: 'black' },
        { name: 'Grey 500', value: '#cdcdcd', textColor: 'black' },
        { name: 'Grey 400', value: '#d9d9d9', textColor: 'black' },
        { name: 'Grey 300', value: '#e9ebf2', textColor: 'black' },
        { name: 'Grey 200', value: '#f4f4f4', textColor: 'black' },
        { name: 'Grey 100', value: '#fafbfc', textColor: 'black' },
        { name: 'White', value: '#ffffff', textColor: 'black', border: true },
      ],
    },
    {
      title: 'Primary（主色）',
      colors: [
        { name: 'Primary 500', value: '#01579b', textColor: 'white' },
        { name: 'Primary 400', value: '#0078d4', textColor: 'white' },
        { name: 'Primary 300', value: '#c6dff3', textColor: 'black' },
        { name: 'Primary 200', value: '#d1ebff', textColor: 'black' },
        { name: 'Primary 100', value: '#e6f7ff', textColor: 'black' },
      ],
    },
    {
      title: 'Secondary（次要色）',
      colors: [
        { name: 'Secondary 500', value: '#568b53', textColor: 'white' },
        { name: 'Secondary 400', value: '#7eaa82', textColor: 'white' },
        { name: 'Secondary 300', value: '#96a895', textColor: 'white' },
        { name: 'Secondary 200', value: '#c0d8bf', textColor: 'black' },
        { name: 'Secondary 100', value: '#e8f5e9', textColor: 'black' },
      ],
    },
    {
      title: 'Warn（警告/危險色）',
      colors: [
        { name: 'Warn 500', value: '#c00000', textColor: 'white' },
        { name: 'Warn 400', value: '#e60000', textColor: 'white' },
        { name: 'Warn 300', value: '#ffcccb', textColor: 'black' },
        { name: 'Warn 200', value: '#fff6f4', textColor: 'black' },
        { name: 'Warn 100', value: '#fff9f9', textColor: 'black' },
      ],
    },
    {
      title: 'Theme Colors（主題色）',
      colors: [
        { name: 'Light Green', value: '#7cb342', textColor: 'white' },
        { name: 'Teal', value: '#009688', textColor: 'white' },
        { name: 'Cyan', value: '#00bcd4', textColor: 'white' },
        { name: 'Blue', value: '#2196f3', textColor: 'white' },
        { name: 'Orange', value: '#e79f2b', textColor: 'white' },
        { name: 'Red', value: '#f44336', textColor: 'white' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {colorCategories.map((category) => (
        <div key={category.title} className="space-y-4">
          <h4 style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '16px', fontWeight: 500 }}>
            {category.title}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {category.colors.map((color) => (
              <div
                key={color.name}
                className="space-y-2"
              >
                {/* 色塊 */}
                <div
                  className="h-[100px] rounded-[var(--radius)] flex items-center justify-center transition-transform hover:scale-105"
                  style={{
                    backgroundColor: color.value,
                    border: color.border ? '1px solid #c4c9d3' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-noto-sans-tc)',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: color.textColor,
                    }}
                  >
                    {color.name}
                  </span>
                </div>
                {/* 色碼 */}
                <div className="text-center">
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#7c808c',
                    }}
                  >
                    {color.value.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 使用說明 */}
      <div className="mt-8 p-6 bg-[#fafbfc] rounded-[var(--radius-card)] space-y-3">
        <h4 style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '16px', fontWeight: 500 }}>
          使用說明
        </h4>
        <ul className="space-y-2 ml-6 list-disc">
          <li style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 350 }}>
            <strong>Neutral</strong>：用於文字、邊框、背景等中性元素
          </li>
          <li style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 350 }}>
            <strong>Primary</strong>：主色為 #01579B，用於主要按鈕、連結、品牌識別等
          </li>
          <li style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 350 }}>
            <strong>Secondary</strong>：次要色為 #568B53，用於次要按鈕、輔助元素等
          </li>
          <li style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 350 }}>
            <strong>Warn</strong>：高風險色 #C00000，用於刪除、錯誤、警告等危險操作
          </li>
          <li style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 350 }}>
            <strong>Theme Colors</strong>：主題色用於狀態標籤、成功提示、資訊展示等
          </li>
        </ul>
      </div>

      {/* 狀態指示器說明 */}
      <div className="mt-8 p-6 bg-[#fafbfc] rounded-[var(--radius-card)] space-y-3">
        <h4 style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '16px', fontWeight: 500 }}>
          狀態指示器顏色規範
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full bg-[#c00000]"></div>
            <div>
              <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 500 }}>
                紅色
              </p>
              <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '12px', fontWeight: 350, color: '#7c808c' }}>
                錯誤
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full bg-[#e79f2b]"></div>
            <div>
              <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 500 }}>
                橙色
              </p>
              <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '12px', fontWeight: 350, color: '#7c808c' }}>
                警告
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full bg-[#7cb342]"></div>
            <div>
              <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 500 }}>
                綠色
              </p>
              <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '12px', fontWeight: 350, color: '#7c808c' }}>
                成功
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full bg-[#7c808c]"></div>
            <div>
              <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '14px', fontWeight: 500 }}>
                灰藍
              </p>
              <p style={{ fontFamily: 'var(--font-noto-sans-tc)', fontSize: '12px', fontWeight: 350, color: '#7c808c' }}>
                中立
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
