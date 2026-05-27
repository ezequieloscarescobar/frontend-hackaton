import { StatusBadge } from '@melipago/shared-ui';
import { formatAmount, formatDate } from '../utils/format';

export function MovementRow({ movement }) {
  const isCredit = movement.type === 'CREDIT';
  return (
    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
      <td style={{ padding: '10px 0' }}>{movement.description}</td>
      <td style={{ padding: '10px 0' }}>
        <span style={{ color: isCredit ? '#0a3622' : '#842029', fontWeight: 500 }}>
          {isCredit ? 'Crédito' : 'Débito'}
        </span>
      </td>
      <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 600, color: isCredit ? '#0a3622' : '#842029' }}>
        {isCredit ? '+' : '-'}{formatAmount(movement.amount)}
      </td>
      <td style={{ padding: '10px 0' }}>
        <StatusBadge status={movement.status} />
      </td>
      <td style={{ padding: '10px 0', color: '#6c757d', fontSize: '13px' }}>
        {formatDate(movement.createdAt)}
      </td>
    </tr>
  );
}
