import React from 'react';
import {
  getCategoryBreakdown,
  getOverviewChartData,
  formatCurrency,
} from '../../utils/formatters';
import { CategoryIcon } from '../common/CategoryIcon';
import { PieChart, BarChart3, TrendingDown } from 'lucide-react';

export const FinancialOverview = ({ transactions = [] }) => {
  const expenseBreakdown = getCategoryBreakdown(transactions, 'debit');
  const chartData = getOverviewChartData(transactions);

  // Find max value in chart data to scale the SVG bars properly
  const maxBarValue = Math.max(
    ...chartData.map((d) => Math.max(d.credit, d.debit)),
    100
  );

  return (
    <div className="overview-grid">
      {/* Activity Bar Chart Card */}
      <div className="overview-card">
        <div className="overview-card-header">
          <div className="overview-header-title">
            <BarChart3 size={18} className="overview-icon" />
            <h4>Weekly Inflow vs Outflow</h4>
          </div>
          <div className="overview-legend">
            <span className="legend-item">
              <span className="legend-dot dot-credit" /> Credit (Income)
            </span>
            <span className="legend-item">
              <span className="legend-dot dot-debit" /> Debit (Expense)
            </span>
          </div>
        </div>

        {/* CSS/SVG Bar Chart */}
        <div className="bar-chart-container">
          <div className="bar-chart-bars">
            {chartData.map((d) => {
              const creditHeight = (d.credit / maxBarValue) * 100;
              const debitHeight = (d.debit / maxBarValue) * 100;

              return (
                <div key={d.day} className="chart-column">
                  <div className="chart-bar-pair">
                    <div
                      className="bar bar-credit"
                      style={{ height: `${Math.max(creditHeight, 4)}%` }}
                      title={`Credit: ${formatCurrency(d.credit)}`}
                    />
                    <div
                      className="bar bar-debit"
                      style={{ height: `${Math.max(debitHeight, 4)}%` }}
                      title={`Debit: ${formatCurrency(d.debit)}`}
                    />
                  </div>
                  <span className="chart-label">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expense by Category Breakdown */}
      <div className="overview-card">
        <div className="overview-card-header">
          <div className="overview-header-title">
            <PieChart size={18} className="overview-icon" />
            <h4>Expense by Category</h4>
          </div>
          <span className="overview-tag">
            <TrendingDown size={14} /> Breakdown
          </span>
        </div>

        <div className="category-breakdown-list">
          {expenseBreakdown.length === 0 ? (
            <p className="no-data-hint">No expense records available yet.</p>
          ) : (
            expenseBreakdown.slice(0, 5).map((item) => (
              <div key={item.category} className="category-progress-item">
                <div className="category-meta-row">
                  <div className="category-name-group">
                    <span className="category-pill-icon">
                      <CategoryIcon category={item.category} size={14} />
                    </span>
                    <span className="category-name">{item.category}</span>
                  </div>
                  <div className="category-amount-group">
                    <span className="category-amt">{formatCurrency(item.amount)}</span>
                    <span className="category-pct">{item.percentage}%</span>
                  </div>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

