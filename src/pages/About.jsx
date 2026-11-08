import { useState } from 'react'
import { motion } from 'framer-motion'

const NEEDS_API = 'https://api.aibay.asia/needs/needs'

function MessageBoard() {
  const [form, setForm] = useState({ name: '', msg: '', contact: '' })
  const [state, setState] = useState('idle')
  const [tip, setTip] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (state === 'sending') return
    if (form.msg.trim().length < 2) {
      setState('error')
      setTip('留言至少写两个字吧')
      return
    }
    setState('sending')
    setTip('')
    try {
      const r = await fetch(NEEDS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          software: `【留言板】${form.name.trim() || '匿名站友'}`,
          scene: '关于页留言板',
          expect: form.msg.trim(),
          contact: form.contact.trim() || '（未留联系方式，无需回复）',
          website: '',
        }),
      })
      const d = await r.json().catch(() => ({}))
      if (r.ok && d.ok) {
        setState('ok')
        setTip('留言已收到，感谢！')
        setForm({ name: '', msg: '', contact: '' })
      } else {
        setState('error')
        setTip(d.error || '提交失败，请稍后再试')
      }
    } catch {
      setState('error')
      setTip('网络异常——也可以在公众号「余雨life」留言')
    }
  }

  return (
    <form onSubmit={submit} className="p-6 rounded-xl bg-dark-card-hover/50 border border-dark-border space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input value={form.name} onChange={set('name')} maxLength={20} className="rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-neon-purple/30" placeholder="怎么称呼你？（可不填）" />
        <input value={form.contact} onChange={set('contact')} maxLength={40} className="rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-neon-purple/30" placeholder="联系方式，想收到回复就留（可不填）" />
      </div>
      <textarea value={form.msg} onChange={set('msg')} maxLength={500} rows={3} className="w-full rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-neon-purple/30 resize-none" placeholder="给我和站友们说句话——建议、疑问、感想都行" />
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white text-[13px] font-bold disabled:opacity-50"
        >
          {state === 'sending' ? '发送中…' : '写下留言'}
        </button>
        {tip && (
          <span className={`text-xs ${state === 'ok' ? 'text-green-600' : 'text-red-500'}`}>{tip}</span>
        )}
      </div>
    </form>
  )
}

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          {/* Avatar and name */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-[#1d1d1f] mb-2">余雨</h1>
            <p className="text-neon-purple font-medium">家居设计师 · AI 应用专家 · 余雨的life实验室</p>
          </div>

          {/* Info grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { label: '角色', value: '家居设计师 · AI 应用专家' },
              { label: '风格', value: '国际视野 × 本土生活' },
              { label: '品牌', value: '余雨的life实验室' },
              { label: '公众号', value: '余雨life' },
            ].map(info => (
              <div key={info.label} className="p-4 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                <div className="text-xs text-[#86868b] mb-1">{info.label}</div>
                <div className="text-sm text-[#1d1d1f]">{info.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">关于我</h2>
            <div className="space-y-3 text-sm text-[#6e6e73] leading-relaxed">
              <p className="text-base font-bold text-[#1d1d1f]">家居设计师｜AI 应用专家</p>
              <p>一名游走于国际视野与本土生活的家居设计师，正在把 AI 应用融入设计。</p>
              <ul className="space-y-2 pt-1">
                <li>🛋️ 曾受邀为北欧极简工坊、意大利手工世家及日本百年品牌操刀产品设计</li>
                <li>🌿 我的作品不只追求视觉的惊艳，更致力于探索家具与人最舒适的相处距离</li>
                <li>🤖 正在将 AI 应用融入设计，让好想法更快落地</li>
              </ul>
              <p className="flex flex-wrap gap-2 mt-4">
                {['家居设计', 'AI 应用', '国际视野 × 本土生活'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs">
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* 服务能力 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">服务能力</h2>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { name: '产品设计', desc: '为北欧极简工坊、意大利手工世家及日本百年品牌操刀设计' },
                { name: '家居设计', desc: '探索家具与人最舒适的相处距离，兼顾视觉与体验' },
                { name: 'AI 应用', desc: '将 AI 融入设计工作流，从灵感到落地提效' },
                { name: '品牌合作', desc: '国际品牌与本土生活方式的跨界合作经验' },
              ].map(s => (
                <div key={s.name} className="p-4 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-lg font-bold text-[#1d1d1f] mb-1">{s.name}</div>
                  <div className="text-xs text-[#6e6e73]">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 鸣谢 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">鸣谢</h2>
            <div className="p-6 rounded-xl bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/20">
              <p className="text-sm text-[#1d1d1f] leading-relaxed mb-4">
                🙏 衷心感谢所有参与本站共建和帮助优化本站的<strong>拆书家</strong>与<strong>学习者</strong>——
                你们的每一段拆页、每一次反馈，都在让这座共同成长的图书馆变得更好。
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  '2255 本经典书籍',
                  '3700+ 位拆书家',
                  '19000+ 拆页卡片',
                  '无数次的共创与打磨',
                ].map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white/50 border border-dark-border text-xs text-[#6e6e73]">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#86868b] mt-4">
                本站拆经典栏目内容整理自拆书帮社区公开拆页（非官方），著作权归各位拆书家本人所有，仅作学习交流之用、不用于商业用途；个人信息已脱敏。如有异议请通过公众号「余雨life」留言联系站长，核实后即刻移除。
              </p>
            </div>
          </div>

          {/* 个人微信公众号 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">个人微信公众号</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={`${import.meta.env.BASE_URL}images/gzh-qr.png`}
                alt="公众号「余雨life」二维码"
                className="w-44 h-44 rounded-xl border border-dark-border bg-white"
              />
              <div className="text-center sm:text-left space-y-3">
                <span className="inline-block px-4 py-2 rounded-lg bg-neon-purple/10 border border-neon-purple/20 text-base font-bold text-neon-purple">
                  余雨life
                </span>
                <p className="text-sm text-[#6e6e73]">微信扫码，或搜索「余雨life」关注</p>
              </div>
            </div>
          </div>

          {/* 拆AI 企业微信讨论群 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">拆AI 企业微信讨论群</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={`${import.meta.env.BASE_URL}images/wecom-group-qr.png`}
                alt="拆AI 企业微信讨论群二维码"
                className="w-44 h-44 rounded-xl border border-dark-border bg-white"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="text-center sm:text-left space-y-3">
                <span className="inline-block px-4 py-2 rounded-lg bg-neon-blue/10 border border-neon-blue/20 text-base font-bold text-neon-blue">
                  心光AI FDE群 · 拆AI讨论
                </span>
                <p className="text-sm text-[#6e6e73]">企业微信扫码进群，与拆书家们一起拆 AI、拆为己用</p>
              </div>
            </div>
          </div>

          {/* 留言板 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#1d1d1f] mb-2">留言板</h2>
            <p className="text-sm text-[#6e6e73] mb-4">匿名即可，不用注册任何账号；想收到回复就顺手留个联系方式。</p>
            <MessageBoard />
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/20 text-center">
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">联系我</h3>
            <p className="text-sm text-[#6e6e73] mb-4">
              产品设计 · 家居咨询 · AI 应用
            </p>
            <span
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium text-sm"
            >
              公众号 · 余雨life
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
