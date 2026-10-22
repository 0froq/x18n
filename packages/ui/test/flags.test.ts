import { describe, expect, it } from 'vitest'
import { flagCandidates } from '../app/flags'

describe('flag candidates', () => {
  it('uses the region flag first', () => {
    expect(flagCandidates('pt-BR')).toEqual(['br', 'lang-pt-br', 'lang-pt', 'xx'])
    expect(flagCandidates('zh_CN', '🇨🇳')).toEqual(['cn', 'lang-zh-cn', 'lang-zh', 'xx'])
  })

  it('falls back to the language icon for world regions and regionless languages', () => {
    expect(flagCandidates('es-419')).toEqual(['lang-es-419', 'lang-es', 'xx'])
    expect(flagCandidates('eo')).toEqual(['lang-eo', 'xx'])
  })

  it('ends with the neutral icon for an unknown code', () => {
    expect(flagCandidates('zzz')).toEqual(['lang-zzz', 'xx'])
  })
})
