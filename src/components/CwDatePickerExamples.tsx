import { useState } from "react";
import { CwDatePicker } from "./CwDatePicker";
import { CwDateRangePicker, DateRange } from "./CwDateRangePicker";

export function CwDatePickerExamples() {
  // CwDatePicker states
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [birthdayDate, setBirthdayDate] = useState<Date | null>(new Date(1990, 0, 1));
  const [disabledDate] = useState<Date | null>(new Date());

  // CwDateRangePicker states
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [eventRange, setEventRange] = useState<DateRange>({
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 31),
  });
  const [reportRange, setReportRange] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="space-y-10">
      {/* CwDatePicker 區塊 */}
      <section className="space-y-6">
        <div>
          <h3 className="mb-2">CwDatePicker 元件</h3>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
            單一日期選擇器元件，用於選擇單個日期
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Date Picker */}
          <div className="space-y-3">
            <h4>基本單日期選擇</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm">選擇日期</label>
                <CwDatePicker
                  value={singleDate}
                  onChange={setSingleDate}
                  placeholder="請選擇日期"
                />
                {singleDate && (
                  <p className="text-sm text-muted-foreground">
                    已選擇：{singleDate.toLocaleDateString('zh-TW')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm">生日日期</label>
                <CwDatePicker
                  value={birthdayDate}
                  onChange={setBirthdayDate}
                  placeholder="請選擇生日"
                />
              </div>
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-3">
            <h4>禁用狀態</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm">禁用的日期選擇器</label>
                <CwDatePicker
                  value={disabledDate}
                  disabled
                  placeholder="無法選擇"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">禁用且無值</label>
                <CwDatePicker
                  value={null}
                  disabled
                  placeholder="無法選擇"
                />
              </div>
            </div>
          </div>

          {/* Direction */}
          <div className="space-y-3">
            <h4>日曆彈出方向</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm">向下彈出（預設）</label>
                <CwDatePicker
                  value={singleDate}
                  onChange={setSingleDate}
                  placeholder="請選擇日期"
                  direction="bottom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">向上彈出</label>
                <CwDatePicker
                  value={singleDate}
                  onChange={setSingleDate}
                  placeholder="請選擇日期"
                  direction="top"
                />
              </div>
            </div>
          </div>

          {/* Real World Examples */}
          <div className="space-y-3">
            <h4>實際應用範例</h4>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm">預約日期</label>
                <CwDatePicker
                  value={singleDate}
                  onChange={setSingleDate}
                  placeholder="請選擇預約日期"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">截止日期</label>
                <CwDatePicker
                  value={singleDate}
                  onChange={setSingleDate}
                  placeholder="請選擇截止日期"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">出生日期</label>
                <CwDatePicker
                  value={birthdayDate}
                  onChange={setBirthdayDate}
                  placeholder="請選擇出生日期"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 分隔線 */}
      <hr className="border-t border-border/30" />

      {/* CwDateRangePicker 區塊 */}
      <section className="space-y-6">
        <div>
          <h3 className="mb-2">CwDateRangePicker 元件</h3>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
            日期範圍選擇器元件，用於選擇開始和結束日期
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Date Range Picker */}
          <div className="space-y-3">
            <h4>基本日期範圍選擇</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm">選擇日期範圍</label>
                <CwDateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder="請選擇日期範圍"
                />
                {dateRange.start && dateRange.end && (
                  <p className="text-sm text-muted-foreground">
                    已選擇：{dateRange.start.toLocaleDateString('zh-TW')} ~ {dateRange.end.toLocaleDateString('zh-TW')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm">活動期間</label>
                <CwDateRangePicker
                  value={eventRange}
                  onChange={setEventRange}
                  placeholder="請選擇活動期間"
                />
              </div>
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-3">
            <h4>禁用狀態</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm">禁用的日期範圍選擇器</label>
                <CwDateRangePicker
                  value={eventRange}
                  disabled
                  placeholder="無法選擇"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">禁用且無值</label>
                <CwDateRangePicker
                  value={{ start: null, end: null }}
                  disabled
                  placeholder="無法選擇"
                />
              </div>
            </div>
          </div>

          {/* Direction */}
          <div className="space-y-3">
            <h4>日曆彈出方向</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm">向下彈出（預設）</label>
                <CwDateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder="請選擇日期範圍"
                  direction="bottom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">向上彈出</label>
                <CwDateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder="請選擇日期範圍"
                  direction="top"
                />
              </div>
            </div>
          </div>

          {/* Real World Examples */}
          <div className="space-y-3">
            <h4>實際應用範例</h4>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm">報表日期區間</label>
                <CwDateRangePicker
                  value={reportRange}
                  onChange={setReportRange}
                  placeholder="請選擇報表日期區間"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">活動舉辦期間</label>
                <CwDateRangePicker
                  value={eventRange}
                  onChange={setEventRange}
                  placeholder="請選擇活動期間"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">訂房日期</label>
                <CwDateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder="請選擇入住和退房日期"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

CwDatePickerExamples.displayName = 'CwDatePickerExamples';
