import { Info } from 'lucide-react';
import { CwTooltip } from './CwTooltip';

export interface OrderProcessStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
  detail?: string;
  tooltipContent?: string;
  onDetailClick?: () => void;
}

export interface OrderProcessFlowProps {
  steps: OrderProcessStep[];
}

export function OrderProcessFlow({ steps }: OrderProcessFlowProps) {
  return (
    <div className="space-y-[12px]">
      {/* 標題 */}
      <div className="flex items-center gap-[6px]">
        <h3 style={{ fontFamily: 'Noto Sans TC, sans-serif', fontSize: '16px', fontWeight: 500, color: '#1c1c1c' }}>
          訂單處理流程
        </h3>
      </div>

      {/* 流程圖 */}
      <div className="flex items-center gap-0">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* 步驟容器 */}
            <div className="flex flex-col items-center w-[80px] flex-shrink-0">
              {/* 圓圈和標籤 */}
              <div className="flex flex-col items-center gap-[12px]">
                {/* 圓圈圖標 */}
                <div className="flex items-center justify-center">
                  <div 
                    className="w-[32px] h-[32px] rounded-full border-[2.5px] flex items-center justify-center shadow-sm"
                    style={{
                      borderColor: step.status === 'completed' ? '#568b53' : 
                                   step.status === 'current' ? '#01579b' : '#c4c9d3',
                      backgroundColor: step.status === 'completed' ? '#568b53' : 
                                       step.status === 'current' ? '#01579b' : '#ffffff'
                    }}
                  >
                    {step.status === 'completed' && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2.5 8L6 11.5L13.5 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {step.status === 'pending' && (
                      <div className="w-[8px] h-[8px] rounded-full bg-[#c4c9d3]"></div>
                    )}
                    {step.status === 'current' && (
                      <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
                    )}
                  </div>
                </div>

                {/* 標籤與 Info Icon */}
                <div className="flex items-center gap-[4px] justify-center">
                  <span 
                    style={{ 
                      fontFamily: 'Noto Sans TC, sans-serif', 
                      fontSize: '13px', 
                      fontWeight: 350,
                      color: step.status === 'pending' ? '#7c808c' : '#1c1c1c',
                      textAlign: 'center',
                      whiteSpace: 'normal',
                      lineHeight: '1.2'
                    }}
                  >
                    {step.label}
                  </span>
                  {step.tooltipContent && (
                    <CwTooltip content={step.tooltipContent}>
                      <Info className="w-[14px] h-[14px] text-[#01579b] cursor-help flex-shrink-0" />
                    </CwTooltip>
                  )}
                </div>

                {/* 狀態文字 */}
                <span 
                  style={{ 
                    fontFamily: 'Noto Sans TC, sans-serif', 
                    fontSize: '11px', 
                    fontWeight: 350,
                    color: step.status === 'completed' ? '#568b53' : 
                           step.status === 'current' ? '#01579b' : '#7c808c',
                    textAlign: 'center'
                  }}
                >
                  {step.status === 'completed' ? '已完成' : 
                   step.status === 'current' ? '進行中' : '待開始'}
                </span>

                {/* 詳細按鈕 */}
                {step.detail && (
                  <button
                    onClick={step.onDetailClick}
                    className="px-[12px] py-[4px] rounded-[3px] border border-[#7c808c] bg-white hover:bg-[#f4f4f4] transition-colors text-[12px]"
                    style={{ 
                      fontFamily: 'Noto Sans TC, sans-serif', 
                      fontWeight: 350,
                      color: '#1c1c1c'
                    }}
                  >
                    {step.detail}
                  </button>
                )}
              </div>
            </div>

            {/* 連接線 */}
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center h-[4px] px-[2px]">
                <div 
                  className="h-[3px] w-full rounded-full"
                  style={{
                    backgroundColor: step.status === 'completed' ? '#568b53' : '#c4c9d3',
                    boxShadow: step.status === 'completed' ? '0 1px 3px rgba(86, 139, 83, 0.2)' : 'none'
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
